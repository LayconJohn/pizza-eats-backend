import joi from 'joi';

export const pedidoSchema = joi.object( {
    image: joi.required(),
    name: joi.string().required(),
    description: joi.string().required(),
    price: joi.string().required(),
    type: joi.string().valid("pizza", "bebida", "acompanhamento").required(),
    pedidoId: joi.string().required(), 
});