import { Router } from "express";
import { getPedido, postPedido, putPedido, deletePedido } from "../controllers/pedidoController.js";
import { verifyJWT } from "../middlewares/authMiddleware";

const router = Router();

router.post('/pedido', verifyJWT, postPedido);
router.get('/pedido', verifyJWT, getPedido);
router.put('/pedido/:id', verifyJWT, putPedido);
router.delete('/pedido/:id', verifyJWT, deletePedido);

export default router;