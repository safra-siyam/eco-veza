import { login, logout, register, createSeller } from "../controllers/UserController";
import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post('/',authMiddleware(['Public']), register);
router.post('/seller',authMiddleware(['Admin']), createSeller);
router.post('/login',authMiddleware(['Public']), login);
router.post('/logout',authMiddleware(['Buyer','Seller','Admin']), logout);

export default router;
