import express from 'express';
import { addSeller, getSellers } from '../controllers/SellerController';

const router = express.Router();

// Route to add a new seller
router.post('/add', addSeller);

router.get('/', getSellers);

export default router;
