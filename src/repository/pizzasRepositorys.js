import db from "../databases/mongodb.js";
import { ObjectId } from "mongodb";

async function create({ image, name, description, price }) {
    return await db.collection("pizzas").insertOne({
        image,
        name,
        description,
        price,
        selected: false,
    })
}

async function update({ id, image, name, description, price }) {
    return await db.collection("pizzas").updateOne( {_id: ObjectId(id) }, {$set: {image, name, description, price}} )
}

async function findOne(id) {
    return await db.collection("pizzas").findOne( {_id: ObjectId(id)} );
}

async function findAll() {
    return await db.collection("pizzas").find( ).toArray();
}

async function remove(id) {
    return await db.collection("pizzas").deleteOne( {_id: ObjectId(id)});
}

const pizzaRepository = {
    create,
    update,
    findOne,
    findAll,
    remove,
}

export default pizzaRepository;