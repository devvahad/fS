// routes/adminRoutes.js
import express from 'express';
import { getStats } from '../controllers/adminController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/stats',/* protect, admin,*/ getStats);

export default router;
