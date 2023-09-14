export function badRequestError(details) {
    return {
        name: "BadRequest",
        message: details,
        status: 400
    }
}