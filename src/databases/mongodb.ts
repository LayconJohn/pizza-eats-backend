import { Db, MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
let db: Db | null = null;

const mongoClient = new MongoClient(process.env.MONGO_URL);

try {
    await mongoClient.connect();
    db = mongoClient.db(process.env.MONGO_DB);
    console.log("Banco de dados conectado com sucesso");

} catch (error) {
    console.error("Houve um erro ao conectar com o banco de dados");
    console.error(error)
}

export default db;


