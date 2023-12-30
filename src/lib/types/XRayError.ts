export class XRayError extends Error {
    constructor(error?: Error) {
        super(error ? error.message : "Unknown parsing error");
    }
}