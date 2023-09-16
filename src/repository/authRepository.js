import db from "../databases/mongodb.js";
import { ObjectId } from "mongodb";

async function create({ username, email, encryptedPassword }) {
    return await db.collection("users").insertOne({
        username,
        email,
        password: encryptedPassword,
    });
}

const authRepository = {
    create,
}

export default authRepository;

