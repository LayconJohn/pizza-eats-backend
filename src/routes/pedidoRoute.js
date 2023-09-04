import { Router } from "express";
import { getPedido, postPedido, putPedido, deletePedido } from "../controllers/pedidoController";

const router = Router();

router.post('/pedido', postPedido);
router.get('/pedido', getPedido);
router.put('/pedido/:id', putPedido);
router.delete('/pedido/:id', deletePedido);

export default router;