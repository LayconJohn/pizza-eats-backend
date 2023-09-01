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
    return await db.collection("pizzas").findOne( {_id: new ObjectId(id)} );
}

const pizzaRepository = {
    create,
    update,
    findOne,
}

export default pizzaRepository;