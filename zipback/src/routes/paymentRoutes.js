import { Router } from 'express';
import { createPayment, handleWebhook, authTest, envHealth } from '../controllers/paymentController.js';

const router = Router();
router.post('/create-payment', createPayment);
router.post('/webhook', handleWebhook);
router.get('/auth-test', authTest);
router.get('/health', envHealth);
export default router;
