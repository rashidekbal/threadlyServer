
export default class ApiError {
    /** HTTP status code of the error */
    status;
    
    /** Error message describing what went wrong */
    errorBody;
    errorType;

    
    constructor(status,errorType ,dataObject) {
        this.status = status;
        this.errorBody = dataObject;
        this.errorType=errorType;
    }
}