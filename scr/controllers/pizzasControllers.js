import db from "../databases/mongodb.js";

import { pedidoSchema } from "../schemas/pedidosSchema.js";

export async function adicionarPizza(req, res) {
    const { image, name, description, price } = req.body;
    console.log( {image: image, name: name, description: description, price: price} )

    const validate = pedidoSchema.validate( { image, name, description, price } );

    if (validate.error) {
        return res.status(422).send("Dados enviados incorretos para adicionar uma nova pizza")
    }

    try {
        await db.collection("pizzas").insertOne( {
            image: image,
            name: name,
            description: description,
            price: price,
            selected: false    
        })
        res.status(201).send("Pizza adicionada com sucesso")
    } catch (error) {
        console.error("Erro ao tentar adicionar uma nova pizza ", error)
        res.sendStatus(500)
    }
}

export async function pegarPizza(req, res) {
    try {
        const pizzas = await db.collection("pizzas").find( ).toArray();
        res.status(200).send(pizzas);
    } catch (error) {
        console.error("Erro ao pegar as pizzas ", error);
    }
    
}