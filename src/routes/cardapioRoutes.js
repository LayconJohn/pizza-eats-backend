import { Router }  from "express";
import { pegarCardapio, cadastrarCardapio } from "../controllers/cardapioControllers.js";

const router = Router();

router.get('/cardapio', pegarCardapio);
router.post('/cardapio', cadastrarCardapio);

export default router;