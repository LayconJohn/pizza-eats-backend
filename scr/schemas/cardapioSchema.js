import joi from 'joi';

export const cardapioSchema = joi.object( {
    id: joi.string().required(),
    title: joi.string().required(),
    items: joi.array().required()
});