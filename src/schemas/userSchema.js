import joi from "joi";

const patternPassword = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

const createUser = joi.object( {
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().regex(patternPassword).password()
});

export const userSchema = {
    createUser,
};