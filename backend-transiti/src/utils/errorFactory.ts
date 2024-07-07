export class HttpError extends Error {
    statusCode: number;
    code: string;
  
    constructor(statusCode: number, message: string, code: string) {
      super(message);
      this.statusCode = statusCode;
      this.message = message;
      this.code = code;
    }
  }

export enum ErrorTypes {
    NotFound = 'NotFound',
    BadRequest = 'BadRequest',
    InvalidID = 'InvalidID',
    InternalServerError = 'InternalServerError',
  }
  
  export class ErrorFactory {
    static createError(type: ErrorTypes, message: string): HttpError {
      switch (type) {
        case ErrorTypes.NotFound:
          return new HttpError(404, message, 'NOT_FOUND');
        case ErrorTypes.BadRequest:
          return new HttpError(400, message, 'BAD_REQUEST');
        case ErrorTypes.InvalidID:
          return new HttpError(400, message, 'INVALID_ID');
        case ErrorTypes.InternalServerError:
        default:
          return new HttpError(500, message, 'INTERNAL_SERVER_ERROR');
      }
    }
  }