import acompanhamentoRepository from "../repository/acompanhamentoRepositorys.js";

async function getAll() {
    return await acompanhamentoRepository.findAll();
}

const acompanhamentoService = {
    getAll,
}

export default acompanhamentoService;