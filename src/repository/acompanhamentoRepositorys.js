import db from '../databases/mongodb.js';
import { ObjectId } from 'mongodb';

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

async function findOne(id) {
    return await db.collection("acompanhamento").findOne( {_id: new ObjectId(id)});
}

async function update({ id, image, name, description, price }) {
    return await db.collection("acompanhamento").updateOne( {_id: id}, {$set: {image, name, description, price}} );
}

async function deleteOne(id) {
    return await db.collection("acompanhamento").deleteOne( {_id: new ObjectId(id)});
}

const acompanhamentoRepository = {
    findAll,
    create,
    findOne,
    update,
    deleteOne,
}

export default acompanhamentoRepository;