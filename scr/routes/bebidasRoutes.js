import { Router } from 'express';
import { pegarBebidas, adicionarBebidas, atualizarBebida, deletarBebida } from '../controllers/bebidasControllers.js';

const router = Router();

router.get('/bebida', pegarBebidas);
router.post('/bebida', adicionarBebidas);
router.put('/bebida/:id', atualizarBebida);
router.delete('/bebida/:id', deletarBebida);

export default router;