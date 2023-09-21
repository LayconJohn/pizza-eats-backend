import { MongoUpsertEntity } from "../../entity/MongoUpsertEntity";


export interface CreateInstance extends MongoUpsertEntity{
    insertedId: string;
}