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

    try {
        const bebida = await db.collection("bebidas").findOne( {_id: new ObjectId(id)});

        if (!bebida) {
            res.status(404).send("Bebida não encontrada")
        }

        await db.collection("bebidas").updateOne( {_id: bebida._id}, {$set: req.body})
        res.status(200).send("Bebida atualizada com sucesso!");
    } catch (error) {
        console.error("Erro ao atualizar as bebidas", error);
        res.sendStatus(500);
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