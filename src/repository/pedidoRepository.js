import db from "../databases/mongodb.js";
import { ObjectId } from "mongodb";

async function create({ image, name, description, price, type, pedidoId }) {
    return await db.collection("pedidos").insertOne({
        image,
        name,
        description,
        price,
        type,
        pedidoId, 
        selected: false,
    })
}

async function update({ id, image, name, description, price, type, pedidoId }) {
    return await db.collection("pedidos").updateOne( {_id: ObjectId(id) }, {$set: {image, name, description, price, type, pedidoId}} )
}

async function findOne(id) {
    return await db.collection("pedidos").findOne( {_id: ObjectId(id)} );
}

async function findAll() {
    return await db.collection("pedidos").find( ).toArray();
}

async function remove(id) {
    return await db.collection("pedidos").deleteOne( {_id: ObjectId(id)});
}

const pedidoRepository = {
    create,
    update,
    findOne,
    findAll,
    remove,
}

export default pedidoRepository;