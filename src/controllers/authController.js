import dotenv from 'dotenv';
import authService from '../services/authService.js';
dotenv.config();

export async function postUser(req, res) {
    const { username, email, password, passwordConfirmation } = req.body;

    try {
        const createdUser = await authService.add({ username, email, password, passwordConfirmation });
        return res.status(201).send(createdUser);
    } catch (error) {
        console.log(error);
        if (error.name === "UnprocessableEntity") {
            return res.status(error.status).send(error.message);
        }
        return res.status(500).send({ error: "internal server Error"});
    }
}



