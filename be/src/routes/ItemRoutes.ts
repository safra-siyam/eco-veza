import { Router } from "express";
import { addItem, deleteItem, updateItem, getItemBySellerId, getAllItems, getItemById } from "../controllers/ProductController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get('/', authMiddleware, getAllItems);
router.get('/get/:id', getItemById);
router.post('/addItem', authMiddleware ,addItem);
router.get('/:sellerId', getItemBySellerId);
router.put('/updateItem/:ProductID', updateItem);
router.delete('/deleteItem/:ProductID', deleteItem);

export default router;