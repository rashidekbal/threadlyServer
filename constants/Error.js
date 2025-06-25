/**
 * Class representing an error response
 * Used for standardizing error responses across the application
 */
export default class error {
    /** HTTP status code of the error */
    status;
    
    /** Error message describing what went wrong */
    message;

    /**
     * Creates a new error instance
     * @param {number} status - HTTP status code
     * @param {string} message - Error message
     */
    constructor(status, message) {
        this.status = status;
        this.message = message;
    }
}