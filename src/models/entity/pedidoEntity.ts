import { ObjectId } from "mongodb";

export type Pedido = {
    id?: string | number | ObjectId;
    image: string;
    name: string;
    description: string;
    price: number | string;
    pedidoId: string | number;
    type: string;
}