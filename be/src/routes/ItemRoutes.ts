import { Router } from "express";
import { addItem, deleteItem, updateItem, getItemBySellerId, getAllItems, getItemById } from "../controllers/ProductController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get('/', authMiddleware(['Buyer','Seller']), getAllItems);
router.get('/get/:id', authMiddleware(['Buyer','Seller']), getItemById);
router.post('/addItem', authMiddleware(['Seller']) ,addItem);
router.get('/:sellerId', authMiddleware(['Seller']), getItemBySellerId);
router.put('/updateItem/:ProductID', authMiddleware(['Seller']), updateItem);
router.delete('/deleteItem/:ProductID', authMiddleware(['Seller']), deleteItem);

export default router;