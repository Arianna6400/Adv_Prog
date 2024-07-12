/**
 * Estensione della classe Error per aggiungere le proprietà statusCode e code
 */
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

  /**
   * Enum di tutti i possibili errori che possono essere gestiti
   */
export enum ErrorTypes {
    NotFound = 'NotFound',
    BadRequest = 'BadRequest',
    InvalidID = 'InvalidID',
    InternalServerError = 'InternalServerError',
    Unauthorized = 'Unauthorized',
    InvalidToken = 'InvalidToken',
    Forbidden = 'Forbidden',
  }
  
  /**
   * Utilizzo del pattern factory per creare istanze di Httperror basate sugli Enum
   */
  export class ErrorFactory {
    static createError(type: ErrorTypes, message: string): HttpError {
      switch (type) {
        case ErrorTypes.NotFound:
          return new HttpError(404, message, 'NOT_FOUND');
        case ErrorTypes.BadRequest:
          return new HttpError(400, message, 'BAD_REQUEST');
        case ErrorTypes.InvalidID:
          return new HttpError(400, message, 'INVALID_ID');
        case ErrorTypes.Unauthorized:
          return new HttpError(401, message, 'UNAUTHORIZED');
          case ErrorTypes.InvalidToken:
        return new HttpError(400, message, 'INVALID_TOKEN');
        case ErrorTypes.Forbidden:
          return new HttpError(403, message, 'FORBIDDEN');
        case ErrorTypes.InternalServerError:
        default:
          return new HttpError(500, message, 'INTERNAL_SERVER_ERROR');
      }
    }
  }