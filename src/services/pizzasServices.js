import { pedidoSchema } from "../schemas/pedidosSchema.js";
import { unprocessableEntityError, notFoundError } from "../errors/index.error.js";
import pizzaRepository from "../repository/pizzasRepositorys.js";

async function add({ image, name, description, price }) {
    const validate = pedidoSchema.validate({image, name, description, price }, {abortEarly: false});
    if (validate.error) {
        const errors = validate.error.details.map(details => details.message);
        throw unprocessableEntityError(errors);
    }
    return await pizzaRepository.create({image, name, description, price});;
}

async function findAll() {
    return await pizzaRepository.findAll();
}

async function update({ id, image, name, description, price }) {
    const validate = pedidoSchema.validate({image, name, description, price}, {abortEarly: false});
    if (validate.error) {
        const errors = validate.error.details.map(details => details.message);
        throw unprocessableEntityError(errors);
    }

    const pizza = await pizzaRepository.findOne(id);
    if (!pizza) {
        throw notFoundError("pizza not found");
    }

    return await pizzaRepository.update({id: pizza._id, image, name, description, price})    
}

async function remove(id) {
    const pizza = await pizzaRepository.findOne(id);
    if (!pizza) {
        throw notFoundError("pizza not found");
    }

    return await pizzaRepository.remove(pizza._id);
}

const pizzaService = {
    add,
    update,
    findAll,
    remove,
}

export default pizzaService;