import { ApplicationError } from "../models/entity/errorEntity";

export function unprocessableEntityError(details: string | string[]): ApplicationError {
    return {
        name: "UnprocessableEntity",
        message: details,
        status: 422
    }
}