import db from '../databases/mongodb.js';
import { pedidoSchema } from '../schemas/pedidosSchema.js';
import { ObjectId } from 'mongodb';

import acompanhamentoService from "../services/acompanhamentoServices.js";

export async function pegarAcompanhamento(req, res) {
    try {
        const acompanhamentos = await acompanhamentoService.getAll();
        res.locals.acompanhamentos = acompanhamentos;
        res.status(200).send(acompanhamentos);
    } catch (error) {
        return res.status(500).send({ error: "Internal Server Error" })
    }
}

export async function adicionarAcompanhamento(req, res) {
    const { image, name, description, price } = req.body;

    try {
        const createdAcompanhamento = await acompanhamentoService.add({ image, name, description, price });
        res.status(201).send(createdAcompanhamento);
    } catch (error) {
        if (error.name === "UnprocessableEntity") {
            return res.status(error.code).send(error.message);
        }
        return res.status(500).send({ error: "Internal Server Error" })
    }
}

export async function atualizarAcompanhamento(req, res) {
    const { id } = req.params;

    try {
        const acompanhamento = await db.collection("acompanhamento").findOne( {_id: new ObjectId(id)});

        if (!acompanhamento) {
            return res.status(404).send("Acompanhamento não encontrado");
        }

        await db.collection("acompanhamento").updateOne( {_id: acompanhamento._id}, {$set: req.body} );
        res.status(200).send("Acompanhamento atualizado com sucesso");
    } catch (error) {
        console.error("Erro ao atualizar o acompanhamento", error);
        res.sendStatus(500)
    }
}

export async function deletarAcompanhamento(req, res) {
    const { id } = req.params;

    try {
        await db.collection("acompanhamento").deleteOne( {_id: new ObjectId(id)});
        res.status(200).send("Acompanhamento deleted successfully")
    } catch (error) {
        console.error("Erro ao deletar o acompanhamento", error);
        res.sendStatus(500)
    }
}