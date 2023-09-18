import { Router } from "express";
import { postUser, loginUser } from "../controllers/authController.js";

const router = Router();

router.post('/auth/create', postUser);
router.post('/auth/login', loginUser);

export default router;