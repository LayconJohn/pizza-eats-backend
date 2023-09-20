import { ObjectId } from "mongodb";

export interface CreateInstance {
    acknowledged: boolean;
    insertedId: string;
}