import { Request, Response } from "express";
import { CreatePedido } from "../models/dto/pedido/index.dto";
import pedidoService from "../services/pedidoService";

type UpsertPedido = Omit<CreatePedido, "type">;

export async function postPedido(req: Request, res: Response){
    const { image, name, description, price, pedidoId } = req.body as UpsertPedido;
    const { type } = req.query;

    try {
        const response = await pedidoService.add({ image, name, description, price, type: type.toString(), pedidoId });
        return res.status(201).send(response);
    } catch (error) {
        if (error.name=="UnprocessableEntity" || error.name=="BadRequest") {
            return res.status(error.status).send(error.message)
        }
        return res.status(500).send({ error: "Internal Server Error" });
    }
}

export async function getPedido(req: Request, res: Response) {
    const { type } = req.query;
    //const { user } = req.headers;
    
    try {
        const response = await pedidoService.findAll(type.toString());
        res.locals.pedidos = response
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({ error: "Internal Server Error" });
    }
    
}

export async function putPedido(req: Request, res: Response) {
    const { id } = req.params;
    const { image, name, description, price, pedidoId } = req.body as UpsertPedido;
    const { type } = req.query;

    try {
        const response = await pedidoService.update({ id, image, name, description, price, type: type.toString(), pedidoId })
        res.status(200).send(response);
    } catch (error) {
        if (error.name === "NotFound") {
            return res.status(error.status).send(error.message);
        }
        if (error.name=="UnprocessableEntity") {
            return res.status(error.status).send(error.message)
        }
        return res.status(500).send({ error: "Internal Server Error" });
    }
}

export async function deletePedido(req: Request, res: Response) {
    const {id} = req.params;

    try {
        const response = await pedidoService.remove(id);
        res.status(200).send(response);
    } catch (error) {
        if (error.name === "NotFound") {
            return res.status(error.status).send(error.message);
        }
        return res.status(500).send({ error: "Internal Server Error" });
    }
}