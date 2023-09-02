import acompanhamentoRepository from "../repository/acompanhamentoRepositorys.js";
import { pedidoSchema } from "../schemas/pedidosSchema.js";
import { unprocessableEntityError, notFoundError } from "../errors/index.error.js"; 

async function getAll() {
    return await acompanhamentoRepository.findAll();
}

async function add({ image, name, description, price }) {
    const validate = pedidoSchema.validate({ image, name, description, price }, { abortEarly: false });
    if (validate.error) {
        const errors = validate.error.details.map( details => details.message);
        throw unprocessableEntityError(errors);
    }

    return await acompanhamentoRepository.create({ image, name, description, price });
}

async function update({ id, image, name, description, price }) {
    const validate = pedidoSchema.validate({ image, name, description, price }, { abortEarly: false });
    if (validate.error) {
        const errors = validate.error.details.map( details => details.message);
        throw unprocessableEntityError(errors);
    }
    
    const acompanhamento = await acompanhamentoRepository.findOne(id);
    if (!acompanhamento) {
        throw notFoundError("Acompanhamento not found");
    }

    return await acompanhamentoRepository.update({ id: acompanhamento._id, image, name, description, price })
}

const acompanhamentoService = {
    getAll,
    add,
    update,
}

export default acompanhamentoService;