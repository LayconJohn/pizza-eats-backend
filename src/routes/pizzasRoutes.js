import { Router } from "express";
import { adicionarPizza, pegarPizza, atualizarPizza, deletarPizza } from "../controllers/pizzasControllers.js";

const router = Router();

router.post('/pizza', adicionarPizza);
router.get('/pizza', pegarPizza);
router.put('/pizza/:id', atualizarPizza);
router.delete('/pizza/:id', deletarPizza);

export default router;