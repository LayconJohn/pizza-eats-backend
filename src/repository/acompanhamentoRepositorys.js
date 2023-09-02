import db from '../databases/mongodb.js';

async function findAll() {
    return await db.collection('acompanhamento').find().toArray();
}

async function create({ image, name, description, price }) {
    return await db.collection("acompanhamento").insertOne( {
        image: image,
        name: name,
        description: description,
        price: price,
        selected: false
    })
}

const acompanhamentoRepository = {
    findAll,
    create,
}

export default acompanhamentoRepository;