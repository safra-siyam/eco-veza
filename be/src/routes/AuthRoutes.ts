import { Router } from "express";
import { authController } from "../controllers/AuthController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get('/check',authMiddleware(['Buyer','Seller','Admin']), authController);

export default router;