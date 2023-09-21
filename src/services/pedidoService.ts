import { pedidoSchema } from "../models/schemas/pedidosSchema";
import { unprocessableEntityError, notFoundError, badRequestError } from "../errors/index.error.js";
import pedidoRepository from "../repository/pedidoRepository";
import { CreatePedido } from "../models/dto/pedido/index.dto.js";
import { ObjectId } from "mongodb";

type AddPedido = Omit<CreatePedido, "type">;


async function add({ image, name, description, price, type, pedidoId }: CreatePedido) {
    const validate = pedidoSchema.validate({image, name, description, price, type, pedidoId }, {abortEarly: false});
    if (validate.error) {
        const errors: string[] = validate.error.details.map(details => details.message);
        throw unprocessableEntityError(errors);
    }
    if (type == "todos") {
        throw badRequestError("Insira um dos items válidos: pizza, bebida ou acompanhamento");
    }
    return await pedidoRepository.create({image, name, description, price, type, pedidoId});
}

async function findAll(type: string) {
    return await pedidoRepository.findAll(type);
}

async function update({ id, image, name, description, price, type, pedidoId }) {
    const validate = pedidoSchema.validate({image, name, description, price, type, pedidoId}, {abortEarly: false});
    if (validate.error) {
        const errors = validate.error.details.map(details => details.message);
        throw unprocessableEntityError(errors);
    }

    const pedido = await pedidoRepository.findOne(id);
    if (!pedido) {
        throw notFoundError("Pedido not found");
    }

    return await pedidoRepository.update({id: pedido._id, image, name, description, price, type, pedidoId})    
}

async function remove(id: string) {
    const pedido = await pedidoRepository.findOne(id);
    if (!pedido) {
        throw notFoundError("Pedido not found");
    }

    return await pedidoRepository.remove(pedido._id);
}

const pedidoService = {
    add,
    update,
    findAll,
    remove,
}

export default pedidoService;