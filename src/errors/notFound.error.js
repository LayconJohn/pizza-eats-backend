export function notFoundError(details) {
    return {
        name: "NotFound",
        message: details,
        status: 404
    }
}