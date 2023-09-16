import { Router } from "express";
import { postUser } from "../controllers/authController.js";

const router = Router();

router.post('/auth/create', postUser);

export default router;