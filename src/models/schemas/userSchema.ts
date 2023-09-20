import joi from "joi";
import { CreateUser, LoginUser } from "../dto/user/index.dto";

const patternPassword = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

const createUser: joi.ObjectSchema<CreateUser> = joi.object( {
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().regex(patternPassword).required(),
    passwordConfirmation: joi.any().valid(joi.ref('password')).required()
});

const loginUser: joi.ObjectSchema<LoginUser> = joi.object({
    email: joi.string().required(),
    password: joi.string().required()
});

export const userSchema = {
    createUser,
    loginUser,
};