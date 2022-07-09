import db from "../databases/mongodb.js";

import { cardapioSchema } from "../schemas/cardapioSchema.js";

export async function pegarCardapio(req, res) {
    try {
        
        res.status(200).send("Aqui vai pegar o cardápio com sucesso")
    } catch (error) {
        console.error("Erro ao acessar os cardápios")
    }
}

export async function cadastrarCardapio(req, res) {
    const { id, title, items } = req.body;

    const validate =  cardapioSchema.validate( {id, title, items} );  

    if (validate.error) {
        return res.status(422).send("Dados enviados incorretos, verifique e tente novamente")
    }

    try {
        await db.collection("cardapio").insertOne(
        {
            id: id,
            title: title,
            items: items,
            done: false
        });
        res.status(201).send("Cardápio cadastrado com sucesso");
    } catch (error) {
        console.error("Erro ao cadastrar o cardápio")
        res.sendStatus(500)
    }  
}