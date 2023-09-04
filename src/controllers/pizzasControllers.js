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
        const pizzas = await pizzaService.findAll();
        res.locals.pizzas = pizzas
        return res.status(200).send(pizzas);
    } catch (error) {
        return res.status(500).send({ error: "Internal Server Error" });
    }
    
}

export async function atualizarPizza(req, res) {
    const { id } = req.params;
    const { image, name, description, price } = req.body;

    try {
        const updatedPizza = await pizzaService.update({ id, image, name, description, price })
        res.status(200).send(updatedPizza);
    } catch (error) {
        if (error.name === "NotFound") {
            return res.status(error.status).send(error.message);
        }
        if (error.name=="UnprocessableEntity") {
            return res.status(error.status).send(error.message)
        }
        res.sendStatus(500);
    }
}

export async function deletarPizza(req, res) {
    const {id} = req.params;

    try {
        const removedPizza = await pizzaService.remove(id);
        res.status(200).send(removedPizza);
    } catch (error) {
        if (error.name === "NotFound") {
            return res.status(error.status).send(error.message);
        }
        res.sendStatus(500);
    }
}