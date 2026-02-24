import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { BlobServiceClient } from '@azure/storage-blob';
import { azureConnection, azureContainer } from '../config/storage.js';

// Necesario para __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta local de uploads
const UPLOADS_DIR = path.join(__dirname, '../../uploads');

// Azure (opcional)
let blobServiceClient = null;
if (azureConnection) {
  blobServiceClient = BlobServiceClient.fromConnectionString(azureConnection);
}

export async function uploadFile(file) {
  // file: { originalname, mimetype, buffer }

  /* =========================
     USAR AZURE (SI EXISTE)
  ========================= */
  if (blobServiceClient) {
    const containerClient = blobServiceClient.getContainerClient(azureContainer);
    await containerClient.createIfNotExists();

    const blobName = `${Date.now()}_${file.originalname}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.uploadData(file.buffer, {
      blobHTTPHeaders: { blobContentType: file.mimetype }
    });

    // Azure devuelve URL pública
    return blockBlobClient.url;
  }

  /* =========================
     GUARDAR LOCALMENTE
  ========================= */

  // Crear carpeta uploads si no existe
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }

  const filename = `${Date.now()}_${file.originalname}`;
  const filePath = path.join(UPLOADS_DIR, filename);

  // Guardar archivo en disco
  fs.writeFileSync(filePath, file.buffer);

  // IMPORTANTE: devolver SOLO el nombre del archivo
  return filename;
}
