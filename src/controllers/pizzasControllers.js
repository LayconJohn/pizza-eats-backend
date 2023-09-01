import db from "../databases/mongodb.js";

import { ObjectId } from "mongodb";

import { pedidoSchema } from "../schemas/pedidosSchema.js";
import pizzaService from "../services/pizzasServices.js";

export async function adicionarPizza(req, res) {
    const { image, name, description, price } = req.body;

    try {
        const createdPizza = await pizzaService.add({ image, name, description, price });
        return res.status(201).send(createdPizza);
    } catch (error) {
        if (error.name=="UnprocessableEntity") {
            return res.status(error.status).send(error.message)
        }
        return res.sendStatus(500)
    }
}

export async function pegarPizza(req, res) {
    try {
        const pizzas = await db.collection("pizzas").find( ).toArray();
        res.locals.pizzas = pizzas
        res.status(200).send(pizzas);
    } catch (error) {
        console.error("Erro ao pegar as pizzas ", error);
    }
    
}

export async function atualizarPizza(req, res) {
    const { id } = req.params;
    const { image, name, description, price } = req.body;

    const validate = pedidoSchema.validate( { image, name, description, price } );

    if (validate.error) {
        return res.status(422).send("Dados enviados incorretos para adicionar uma nova pizza")
    }

    try {
        const pizza = await db.collection("pizzas").findOne( {_id: new ObjectId(id)} );

        if (!pizza) {
            return res.status(404).send("Pizza não encontrada");
        }

        await db.collection("pizzas").updateOne( {_id: ObjectId(pizza._id) }, {$set: req.body} )
        res.status(200).send("Pizza atualizada com sucesso!");
    } catch (error) {
        console.error("Erro ao atualizar os dados", error)
        res.sendStatus(500);
    }
}

export async function deletarPizza(req, res) {
    const {id} = req.params;

    try {
        await db.collection("pizzas").deleteOne( {id: new ObjectId(id)});
        res.status(200).send("Pizza deletada com sucesso!");
    } catch (error) {
        console.error("Erro ao deletar os dados", error)
        res.sendStatus(500);
    }
}