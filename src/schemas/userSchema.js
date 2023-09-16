import joi from "joi";

const patternPassword = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

const createUser = joi.object( {
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().regex(patternPassword).required(),
    passwordConfirmation: joi.any().valid(joi.ref('password')).required()
});

export const userSchema = {
    createUser,
};