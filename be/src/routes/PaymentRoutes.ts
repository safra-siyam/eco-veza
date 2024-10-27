import { Router } from 'express';
import { createPayment } from '../controllers/PaymentController'; // Adjust the import path as necessary
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/create-payment-intent',authMiddleware(['Buyer']), createPayment);

export default router;
