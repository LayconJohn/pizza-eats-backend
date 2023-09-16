import db from "../databases/mongodb.js";
import { ObjectId } from "mongodb";

async function create({ username, email, encryptedPassword }) {
    return await db.collection("users").insertOne({
        username,
        email,
        password: encryptedPassword,
    });
}

async function findByEmail(email) {
    return await db.collection("users").findOne({ email: email });
}

const authRepository = {
    create,
    findByEmail,
}

export default authRepository;

