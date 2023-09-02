import db from '../databases/mongodb.js';

async function findAll() {
    return await db.collection('acompanhamento').find().toArray();
}

const acompanhamentoRepository = {
    findAll,
}

export default acompanhamentoRepository;