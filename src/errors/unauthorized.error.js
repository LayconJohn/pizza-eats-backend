export function unauthorizedError(details) {
    return {
        name: "Unauthorized",
        message: details,
        status: 401
    }
}