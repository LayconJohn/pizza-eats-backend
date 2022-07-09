import { Router } from 'express';
import { pegarBebidas, adicionarBebidas } from '../controllers/bebidasControllers.js';

const router = Router();

router.get('/bebida', pegarBebidas);
router.post('/bebida', adicionarBebidas);

export default router;