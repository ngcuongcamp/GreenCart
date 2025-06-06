class ResponseModel {
    constructor(status, statusCode, message, shortMsg = message, data = null) {
        this.status = status; // true/false for success/failure
        this.statusCode = statusCode; // HTTP status code
        this.message = message; // Response message
        this.shortMsg = shortMsg; // Response message shorter
        this.data = data; // Response data (can be object, array, etc.)
        this.timestamp = new Date().toISOString(); // ISO timestamp
    }

    // Create success response
    static success(statusCode = 200, message, shortMsg = message, data = null) {
        return new ResponseModel(true, statusCode, message, shortMsg, data);
    }

    // Create error response
    static error(statusCode = 400, message, shortMsg = message, data = null) {
        return new ResponseModel(false, statusCode, message, shortMsg, data);
    }

    // Format response for Express
    toJSON() {
        return {
            status: this.status,
            statusCode: this.statusCode,
            message: this.message,
            shortMsg: this.shortMsg,
            data: this.data,
            timestamp: this.timestamp
        };
    }

    send(res) {
        return res.status(this.statusCode).json(this.toJSON());
    }
}

export default ResponseModel