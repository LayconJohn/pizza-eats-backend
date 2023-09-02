import bebidaRepository from "../repository/bebidasRepositorys.js";
import { pedidoSchema } from '../schemas/pedidosSchema.js';
import { unprocessableEntityError, notFoundError } from "../errors/index.error.js";

async function findAll() {
    return await bebidaRepository.findAll();
}

async function add({ image, name, description, price }) {
    const validate = pedidoSchema.validate({ image, name, description, price }, { abortEarly: false });
    if (validate.error) {
        const errors = validate.error.details.map( details => details.message);
        throw unprocessableEntityError(errors);
    }

    return await bebidaRepository.create({ image, name, description, price });
}

async function updateOne({ id, image, name, description, price }) {
    const validate = pedidoSchema.validate({ image, name, description, price }, { abortEarly: false });
    if (validate.error) {
        const errors = validate.error.details.map( details => details.message);
        throw unprocessableEntityError(errors);
    }

    const bebida = await bebidaRepository.findOne(id);
    if (!bebida) {
        throw notFoundError("Bebida not found");
    }

    return await bebidaRepository.update({id: bebida._id, image, name, description, price});
}

const bebidaService = {
    findAll,
    add,
    updateOne,
}

export default bebidaService;