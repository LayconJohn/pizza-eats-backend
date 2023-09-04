import pedidoService from "../services/pedidoService.js";

export async function postPedido(req, res) {
    const { image, name, description, price, pedidoId } = req.body;
    const { type } = req.query;

    try {
        const response = await pedidoService.add({ image, name, description, price, type, pedidoId });
        return res.status(201).send(response);
    } catch (error) {
        if (error.name=="UnprocessableEntity") {
            return res.status(error.status).send(error.message)
        }
        return res.status(500).send({ error: "Internal Server Error" });
    }
}

export async function getPedido(req, res) {
    const { type } = req.query;
    try {
        const response = await pedidoService.findAll(type);
        res.locals.pedidos = response
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({ error: "Internal Server Error" });
    }
    
}

export async function putPedido(req, res) {
    const { id } = req.params;
    const { image, name, description, price, pedidoId } = req.body;
    const { type } = req.query;

    try {
        const response = await pedidoService.update({ id, image, name, description, price, type, pedidoId })
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

export async function deletePedido(req, res) {
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