import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import cardapioRoutes from "./routes/cardapioRoutes.js";
import pizzaRoutes from "./routes/pizzasRoutes.js";

const app = express();

dotenv.config()
app.use(cors());
app.use(express.json());

app.use(pizzaRoutes);
app.use(cardapioRoutes);

const PORT = process.env.PORT || 5009;

app.listen(PORT, () => {
    console.log('Servidor funfando certinho');
})