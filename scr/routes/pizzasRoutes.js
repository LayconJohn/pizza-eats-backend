import { Router } from "express";
import { adicionarPizza, pegarPizza } from "../controllers/pizzasControllers.js";

const router = Router();

router.post('/pizza', adicionarPizza);
router.get('/pizza', pegarPizza);

export default router;