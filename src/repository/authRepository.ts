import db from "../databases/mongodb.js";
import { CreateInstance } from "src/models/dto/mongodb/createInstanceDto.js";
import { ObjectId } from "mongodb";
import { User } from "src/models/entity/userEntity.js";

async function create({ username, email, encryptedPassword }): Promise<CreateInstance>  {
    return await db.collection("users").insertOne({
        username,
        email,
        password: encryptedPassword,
    });
}

async function findByEmail(email: string): Promise<User> {
    return await db.collection("users").findOne({ email: email });
}

const authRepository = {
    create,
    findByEmail,
}

export default authRepository;

