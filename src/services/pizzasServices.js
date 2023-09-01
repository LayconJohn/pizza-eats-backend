import { pedidoSchema } from "../schemas/pedidosSchema.js";
import { unprocessableEntityError } from "../errors/index.error.js";
import pizzaRepository from "../repository/pizzasRepositorys.js";

async function add({ image, name, description, price }) {
    const validate = pedidoSchema.validate({image, name, description, price }, {abortEarly: false});
    if (validate.error) {
        const errors = validate.error.details.map(details => details.message);
        throw unprocessableEntityError(errors);
    }

    return await pizzaRepository.create({image, name, description, price});;
}

const pizzaService = {
    add,
}

export default pizzaService;