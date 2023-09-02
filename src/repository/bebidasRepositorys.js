import db from '../databases/mongodb.js';

async function findAll() {
    return await db.collection('bebidas').find().toArray();
}

const bebidaRepository = {
    findAll,
}

export default bebidaRepository;