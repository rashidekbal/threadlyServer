
export default class ApiError {
    /** HTTP status code of the error */
    status;
    
    /** Error message describing what went wrong */
    data;

    
    constructor(status, data) {
        this.status = status;
        this.data = data;
    }
}