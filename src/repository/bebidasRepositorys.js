import db from '../databases/mongodb.js';
import { ObjectId } from 'mongodb';

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

async function findOne(id) {
    return await db.collection("bebidas").findOne( {_id: new ObjectId(id)});
}

async function update({ id, image, name, description, price  }) {
    return await db.collection("bebidas").updateOne( {_id: id}, {$set: {image, name, description, price}});
}

const bebidaRepository = {
    findAll,
    create,
    findOne,
    update,
}

export default bebidaRepository;