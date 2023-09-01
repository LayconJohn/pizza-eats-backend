import db from "../databases/mongodb.js";

async function create({ image, name, description, price }) {
    return await db.collection("pizzas").insertOne({
        image,
        name,
        description,
        price,
        selected: false,
    })
}

const pizzaRepository = {
    create,
}

export default pizzaRepository;