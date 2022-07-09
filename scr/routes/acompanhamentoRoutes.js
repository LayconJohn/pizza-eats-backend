import { Router } from "express";
import { pegarAcompanhamento, adicionarAcompanhamento } from "../controllers/acompanhamentoControllers.js";

const router = Router();

router.get('/acompanhamento', pegarAcompanhamento);
router.post('/acompanhamento', adicionarAcompanhamento);

export default router;