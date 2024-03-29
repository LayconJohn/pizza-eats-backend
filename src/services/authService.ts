import bcrypt from "bcrypt";
import { userSchema } from "../models/schemas/userSchema.js";
import { unprocessableEntityError, unauthorizedError, badRequestError } from "../errors/index.error.js";
import authRepository from "../repository/authRepository.js";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { CreateUser } from "src/models/dto/user/createUserDto.js";
import { LoginUser } from "src/models/dto/user/loginUserDto.js";

dotenv.config();


async function add({ username, email, password, passwordConfirmation }: CreateUser) {
    const validation = userSchema.createUser.validate({ username, email, password, passwordConfirmation }, {abortEarly:false});
    if (validation.error) {
        const errors: string[] = validation.error.details.map(details => details.message);
        throw unprocessableEntityError(errors);
    }

    const user = await authRepository.findByEmail(email);
    if (user) {
        throw unauthorizedError("User already exists");
    }

    const encryptedPassword = bcrypt.hashSync(password, 10);

    return await authRepository.create({ username, email, encryptedPassword });
}

async function login({ email, password }: LoginUser) {
    const validation = userSchema.loginUser.validate({ email, password }, {abortEarly: false});
    if (validation.error) {
        const errors: string[] = validation.error.details.map(details => details.message);
        throw unprocessableEntityError(errors);
    }

    const user = await authRepository.findByEmail(email);
    if (user) {
        const checkPassword = bcrypt.compareSync(password, user?.password);
        if (!checkPassword) {
            throw badRequestError("Email or password invalid");
        }
        const token = jwt.sign(
            {
                username: user.username,
                email: user.email
            }, 
            process.env.SECRET, 
            {
            expiresIn: '60m'
        })
        return token;
    } else {
        throw badRequestError("Email or password invalid");
    }

}

const authService = {
    add,
    login,
}

export default authService;