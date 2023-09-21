import { ObjectId } from "mongodb";
import { Pedido } from "src/models/entity/pedidoEntity";

export interface GetPedido extends Pedido {
    selected: boolean;
    _id?: ObjectId;
}