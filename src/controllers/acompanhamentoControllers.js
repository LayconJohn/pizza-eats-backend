import db from '../databases/mongodb.js';
import { pedidoSchema } from '../schemas/pedidosSchema.js';


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
        return res.status(201).send(createdAcompanhamento);
    } catch (error) {
        if (error.name === "UnprocessableEntity") {
            return res.status(error.code).send(error.message);
        }
        return res.status(500).send({ error: "Internal Server Error" })
    }
}

export async function atualizarAcompanhamento(req, res) {
    const { id } = req.params;
    const { image, name, description, price } = req.body;

    try {

        const updatedAcompanhamento = await acompanhamentoService.update( { id, image, name, description, price });
        return res.status(200).send(updatedAcompanhamento);
    } catch (error) {
        if (error.name === "UnprocessableEntity" || error.name === "NotFound") {
            return res.status(error.status).send(error.message);
        }
        return res.status(500).send({ error: "Internal Server Error" })
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