import db from "../databases/mongodb.js";
import { ObjectId } from "mongodb";
import { CreatePedido } from "../models/dto/pedido/index.dto";
import { CreateInstance } from "src/models/dto/mongodb/createInstanceDto.js";
import { GetPedido } from "src/models/dto/pedido/getPedidoDto.js";

async function create({ image, name, description, price, type, pedidoId }: CreatePedido): Promise<string|CreateInstance> {
    if (type === "todos") {
        return "Selcione pizza, bebida ou acompanhamento"
    }
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
    return await db.collection("pedidos").updateOne( {_id: new ObjectId(id) }, {$set: {image, name, description, price, type, pedidoId}} )
}

async function findOne(id) {
    return await db.collection("pedidos").findOne( {_id: new ObjectId(id)} );
}

async function findAll(type: string): Promise<GetPedido> {
    if (type === "todos") {
        return await db.collection("pedidos").find().toArray();
    }
    return await db.collection("pedidos").find({type}).toArray();
}

async function remove(id) {
    return await db.collection("pedidos").deleteOne( {_id: new ObjectId(id)});
}

const pedidoRepository = {
    create,
    update,
    findOne,
    findAll,
    remove,
}

export default pedidoRepository;