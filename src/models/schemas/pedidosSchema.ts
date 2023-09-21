import joi from 'joi';
import { CreatePedido } from '../dto/pedido/createPedidoDto';

export const pedidoSchema: joi.ObjectSchema<CreatePedido> = joi.object( {
    image: joi.required(),
    name: joi.string().required(),
    description: joi.string().required(),
    price: joi.string().required(),
    type: joi.string().valid("pizza", "bebida", "acompanhamento", "todos").required(),
    pedidoId: joi.string().required(), 
});