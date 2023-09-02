import db from '../databases/mongodb.js';

async function findAll() {
    return await db.collection('bebidas').find().toArray();
}

async function create({ image, name, description, price }) {
    return await db.collection("bebidas").insertOne( {
        image: image,
        name: name,
        description: description,
        price: price,
        selected: false
    });
}

const bebidaRepository = {
    findAll,
    create,
}

export default bebidaRepository;