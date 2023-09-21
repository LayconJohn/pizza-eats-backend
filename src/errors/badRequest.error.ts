import { ApplicationError } from "../models/entity/errorEntity";

export function badRequestError(details: string | string[]): ApplicationError {
    return {
        name: "BadRequest",
        message: details,
        status: 400
    }
}