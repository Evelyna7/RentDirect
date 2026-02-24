import express from 'express';
import * as ApplicationsController from '../controllers/applications.controller.js';
import { authenticate, authorize } from '../../middlewares/auth.middleware.js';

const router = express.Router();

/**
 * TENANT → aplicar a una propiedad
 */
router.post(
  '/properties/:id/apply',
  authenticate,
  authorize(['tenant', 'admin']),
  ApplicationsController.applyToProperty
);

/**
 * ✅ TENANT → ver MIS aplicaciones
 */
router.get(
  '/applications/me',
  authenticate,
  authorize(['tenant', 'admin']),
  ApplicationsController.listMyApplications
);

/**
 * OWNER → ver aplicaciones de una propiedad
 */
router.get(
  '/properties/:id/applications',
  authenticate,
  authorize(['owner', 'admin']),
  ApplicationsController.listApplicationsForProperty
);

/**
 * OWNER → aprobar / rechazar
 */
router.put(
  '/applications/:id',
  authenticate,
  authorize(['owner', 'admin']),
  ApplicationsController.updateApplicationStatus
);

/**
 * TENANT → retirar aplicación
 */
router.delete(
  '/applications/:id',
  authenticate,
  authorize(['tenant', 'admin']),
  ApplicationsController.withdrawApplication
);

export default router;
