import express from 'express';
import { getMe, updateMe, uploadDocumentHandler } from '../controllers/users.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
const router = express.Router();

router.get('/me', authenticate, getMe);
router.put('/me', authenticate, updateMe);
router.post('/me/documents', authenticate, uploadDocumentHandler);

export default router;
