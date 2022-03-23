import { AppError, Serialize } from './app-error';

export class BadRequestError extends AppError {
  statusCode = 400;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serialize(): Serialize {
    return { message: this.message };
  }
}
