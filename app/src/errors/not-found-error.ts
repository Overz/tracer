import { AppError, Serialize } from './app-error';

const message = 'Not found';

export class NotFoundError extends AppError {
  statusCode = 404;

  constructor() {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serialize(): Serialize {
    return { message };
  }
}
