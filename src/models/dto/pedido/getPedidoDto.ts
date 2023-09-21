import { Pedido } from "src/models/entity/pedidoEntity";

export interface GetPedido extends Pedido {
    selected: boolean;
}