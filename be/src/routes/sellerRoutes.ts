// routes/SellerRoutes.ts
import express from 'express';
import { addSeller, getSellers } from '../controllers/SellerController';

const router = express.Router();

// Route to add a new seller
router.post('/add', addSeller);

// Route to get all sellers (optional)
router.get('/', getSellers);

export default router;
