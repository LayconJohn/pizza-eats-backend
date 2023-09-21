import { ApplicationError } from "../models/entity/errorEntity";

export function notFoundError(details: string | string[]): ApplicationError {
    return {
        name: "NotFound",
        message: details,
        status: 404
    }
}