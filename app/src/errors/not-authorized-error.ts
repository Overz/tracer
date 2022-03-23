import { AppError, Serialize } from './app-error';

const message = 'Not Auhorized';

export class NotAuthorizedError extends AppError {
  statusCode = 401;

  constructor() {
    super(message);
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serialize(): Serialize {
    return { message };
  }
}
