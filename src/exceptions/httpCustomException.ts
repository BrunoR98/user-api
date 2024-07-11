import { ErrorMessage, HttpStatusCode } from '../enum/Error.enum';

export class HttpCustomException extends Error {
  public status: number;
  public message: string;

  constructor(status?: number, message?: string) {
    super(message);
    this.status = status || HttpStatusCode.BAD_REQUEST;
    this.message = message || ErrorMessage.BAD_REQUEST;
  }

  createBody() {
    return {
      status: this.status,
      message: this.message,
    };
  }
}
