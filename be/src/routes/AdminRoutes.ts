import express, { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { getBuyers, getOrders, getSellers } from '../controllers/SellerController';
import { getAllItems } from '../controllers/ProductController';

const router = Router();

// Route to get all sellers
router.get('/sellers',authMiddleware(['Admin']), getSellers);
router.get('/items',authMiddleware(['Admin']), getAllItems);
router.get('/buyers',authMiddleware(['Admin']), getBuyers);
router.get('/orders',authMiddleware(['Admin']), getOrders);
export default router;
