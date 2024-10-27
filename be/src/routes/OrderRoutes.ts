import { Router } from "express";
import { createOrder, getMyOrders } from "../controllers/OrderController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Route to create a new order
router.post('/createOrder',authMiddleware(['Buyer']), createOrder);
router.get('/myOrders',authMiddleware(['Seller']), getMyOrders);

export default router;
