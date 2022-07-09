import db from '../databases/mongodb.js';
import { pedidoSchema } from '../schemas/pedidosSchema.js';

export async function pegarBebidas(req, res) {
    try {
        const bebidas = await db.collection('bebidas').find().toArray();
        res.status(200).send(bebidas);
    } catch (error) {
        console.error("Erro ao pegar as bebidas", error);
    }
}

export async function adicionarBebidas(req, res) {
    const { image, name, description, price } = req.body;

    const validate = pedidoSchema.validate( {image, name, description, price} );

    if (validate.error) {
        return res.status(422).send("Dados inválidos")
    }

    try {
        await db.collection("bebidas").insertOne( {
            image: image,
            name: name,
            description: description,
            price: price,
            selected: false
        } )
        res.status(201).send("Bebida cadastrada com sucesso!")
    } catch (error) {
        console.error("Erro ao cadastrar uma bebida")
        res.sendStatus(500);
    }
}