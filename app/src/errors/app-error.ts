export interface ErrorData {
  message: string;
  errors?: string[];
}

export type Serialize = { message: string };

export abstract class AppError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }

  abstract serialize(): ErrorData;
}
