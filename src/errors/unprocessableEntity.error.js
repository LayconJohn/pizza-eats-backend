export function unprocessableEntityError(details) {
    return {
        name: "UnprocessableEntity",
        message: details,
        status: 422
    }
}