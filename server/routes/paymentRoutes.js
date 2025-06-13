// routes/paymentRoutes.js
import express from 'express';
import { createPaymentLink } from '../controllers/cashfreeController.js';
const router = express.Router();

router.post('/cashfree-link', createPaymentLink);
export default router;
