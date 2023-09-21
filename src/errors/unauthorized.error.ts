import { ApplicationError } from "../models/entity/errorEntity";

export function unauthorizedError(details: string | string[]): ApplicationError {
    return {
        name: "Unauthorized",
        message: details,
        status: 401
    }
}