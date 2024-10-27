import { Router } from "express";
import { createOrder } from "../controllers/OrderController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Route to create a new order
router.post('/createOrder',authMiddleware(['Buyer']), createOrder);

export default router;
