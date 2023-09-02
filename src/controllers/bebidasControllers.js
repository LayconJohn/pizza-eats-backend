import { ObjectId } from 'mongodb';
import db from '../databases/mongodb.js';
import { pedidoSchema } from '../schemas/pedidosSchema.js';

import bebidaService from "../services/bebidasServices.js";

export async function pegarBebidas(req, res) {
    try {
        const bebidas = await bebidaService.findAll();
        res.locals.bebidas = bebidas;
        res.status(200).send(bebidas);
    } catch (error) {
        return res.status(500).send({ error: "Internal Servier Error" });
    }
}

export async function adicionarBebidas(req, res) {
    const { image, name, description, price } = req.body;

    try {
        const createdBebida = await bebidaService.add({ image, name, description, price });
        return res.status(201).send(createdBebida);
    } catch (error) {
        if (error.name === "UnprocessableEntity") {
            return res.status(error.status).send(error.message);
        }
        return res.status(500).send({ error: "Internal Servier Error" });
    }
}

export async function atualizarBebida(req, res) {
    const { id } = req.params;
    const { image, name, description, price } = req.body;

    try {
        const updatedBebida = await bebidaService.updateOne({ id, image, name, description, price });
        res.status(200).send(updatedBebida);
    } catch (error) {
        if (error.name === "NotFound") { 
            return res.status(error.status).send(error.message);
        }
        if (error.name === "UnprocessableEntity") {
            return res.status(error.status).send(error.message);
        }
        return res.status(500).send({ error: "Internal Servier Error" });
    }
}

export async function deletarBebida(req, res) {
    const { id } = req.params;

    try {
        await db.collection("bebidas").deleteOne( {_id: new ObjectId(id)})
        res.status(200).send("Bebida deletada com sucesso!");
    } catch (error) {
        console.error("Erro ao atualizar as bebidas", error);
        res.sendStatus(500);
    }

}