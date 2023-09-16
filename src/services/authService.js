import bcrypt from "bcrypt";
import { userSchema } from "../schemas/userSchema.js";
import { unprocessableEntityError } from "../errors/index.error.js";
import authRepository from "../repository/authRepository.js";


async function add({ username, email, password, passwordConfirmation }) {
    const validation = userSchema.createUser.validate({ username, email, password, passwordConfirmation }, {abortEarly:false});
    if (validation.error) {
        const errors = validation.error.details.map(details => details.message);
        throw unprocessableEntityError(errors);
    }

    const encryptedPassword = bcrypt.hashSync(password, 10);

    return await authRepository.create({ username, email, encryptedPassword });
}

const authService = {
    add,
}

export default authService;