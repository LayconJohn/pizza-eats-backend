import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { CreateUser } from 'src/models/dto/user/createUserDto.js';
import authService from '../services/authService.js';
dotenv.config();

export async function postUser(req: Request, res: Response) {
    const { username, email, password, passwordConfirmation } = req.body as CreateUser;

    try {
        const createdUser = await authService.add({ username, email, password, passwordConfirmation });
        return res.status(201).send(createdUser);
    } catch (error) {
        if (error.name === "UnprocessableEntity" || error.name==="Unauthorized") {
            return res.status(error.status).send(error.message);
        }
        return res.status(500).send({ error: "internal server Error"});
    }
}

export async function loginUser(req, res) {
    const { email, password } = req.body;

    try {
        const token = await authService.login({ email, password });
        return res.status(200).send({ token: token });
    } catch (error) {
        if (error.name === "BadRequest") {
            return res.status(error.status).send(error.message);
        }
        console.log(error)
        return res.status(500).send({ error: "internal server Error"});
    }
}



