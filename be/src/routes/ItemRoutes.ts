import { Router } from "express";
import { addItem, deleteItem, updateItem, getItemBySellerId, getAllItems, getItemById } from "../controllers/ProductController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get('/', authMiddleware, getAllItems);
router.get('/get/:id', authMiddleware, getItemById);
router.post('/addItem', authMiddleware ,addItem);
router.get('/:sellerId', authMiddleware, getItemBySellerId);
router.put('/updateItem/:ProductID', authMiddleware, updateItem);
router.delete('/deleteItem/:ProductID', authMiddleware, deleteItem);

export default router;