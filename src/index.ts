import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import cardapioRoutes from "./routes/cardapioRoutes.js";
import pedidosRoute from "./routes/pedidoRoute.js";
import authRoute from "./routes/authRoute.js";

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

app.use(cardapioRoutes);
app.use(pedidosRoute);
app.use(authRoute);

const PORT = process.env.PORT || 5009;

app.listen(PORT, () => {
    console.log('Servidor funfando certinho');
})