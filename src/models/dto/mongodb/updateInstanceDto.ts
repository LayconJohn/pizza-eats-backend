import { MongoUpsertEntity } from "../../entity/MongoUpsertEntity";

export interface UpdateInstance extends MongoUpsertEntity {
    upsertedId: string;
    matchedCount: number;
    modifiedCount: number;
}