export type Pedido = {
    id?: string | number;
    image: string;
    name: string;
    description: string;
    price: number;
    pedidoId: string | number;
    type: string;
}