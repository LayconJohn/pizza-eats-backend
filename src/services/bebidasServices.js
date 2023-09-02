import bebidaRepository from "../repository/bebidasRepositorys.js";

async function findAll() {
    return await bebidaRepository.findAll();
}

const bebidaService = {
    findAll,
}

export default bebidaService;