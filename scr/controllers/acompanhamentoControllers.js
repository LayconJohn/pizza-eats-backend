import db from '../databases/mongodb.js';
import { pedidoSchema } from '../schemas/pedidosSchema.js';

export async function pegarAcompanhamento(req, res) {
    try {
        const acompanhamentos = await db.collection('acompanhamento').find().toArray();
        res.locals.acompanhamentos = acompanhamentos;
        res.status(200).send(acompanhamentos);
    } catch (error) {
        console.error("Erro ao pegar o acompanhamento", error);
        res.status(500);
    }
}

export async function adicionarAcompanhamento(req, res) {
    const { image, name, description, price } = req.body;

    const validate = pedidoSchema.validate( { image, name, description, price} );

    if (validate.error) {
        return res.status(422).send("Dados do acompanhamento inválidos");
    }

    try {
        await db.collection("acompanhamento").insertOne( {
            image: image,
            name: name,
            description: description,
            price: price,
            selected: false
        })
        res.status(201).send("Acompanhamento adicionado com sucesso");
    } catch (error) {
        console.error("Erro ao cadastrar o acompanhamento", error);
        res.status(500);
    }
}