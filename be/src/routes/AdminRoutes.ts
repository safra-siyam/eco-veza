import express from 'express';
import { addSeller, getSellers, deleteSeller } from '../controllers/AdminController';

const router = express.Router();

// Route to add a seller
router.post('/sellers', addSeller);

// Route to get all sellers
router.get('/sellers', getSellers);

// Route to delete a seller by ID
router.delete('/sellers/:id', deleteSeller);

export default router;
