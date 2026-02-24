import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

// Necesario para __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import authRoutes from './api/routes/auth.routes.js';
import usersRoutes from './api/routes/users.routes.js';
import propertiesRoutes from './api/routes/properties.routes.js';
import applicationsRoutes from './api/routes/applications.routes.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

/* ================================
   SERVIR IMÁGENES LOCALES
   ================================ */
// Esto permite acceder desde el navegador a:
// http://localhost:4000/uploads/nombre_imagen.jpg
app.use(
  '/uploads',
  express.static(path.join(__dirname, '../uploads'))
);

/* ================================
   RUTAS
   ================================ */

// health check
app.get('/health', (req, res) => res.json({ ok: true }));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/properties', propertiesRoutes);
app.use('/api/v1', applicationsRoutes);

/* ================================
   ERROR HANDLER
   ================================ */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Server error',
  });
});

/* ================================
   SOCKET.IO
   ================================ */
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

io.of('/chat').on('connection', (socket) => {
  console.log('socket connected', socket.id);

  socket.on('join', ({ conversationId }) => {
    socket.join(`conv_${conversationId}`);
  });

  socket.on('message', (msg) => {
    io.of('/chat')
      .to(`conv_${msg.conversationId}`)
      .emit('message', msg);
  });
});

/* ================================
   START SERVER
   ================================ */
const PORT = process.env.PORT || 4000;
server.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
