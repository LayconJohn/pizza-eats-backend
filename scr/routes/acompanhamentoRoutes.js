import { Router } from "express";
import { pegarAcompanhamento, adicionarAcompanhamento, atualizarAcompanhamento, deletarAcompanhamento } from "../controllers/acompanhamentoControllers.js";

const router = Router();

router.get('/acompanhamento', pegarAcompanhamento);
router.post('/acompanhamento', adicionarAcompanhamento);
router.put('/acompanhamento/:id', atualizarAcompanhamento);
router.delete('/acompanhamento/:id', deletarAcompanhamento);

export default router;