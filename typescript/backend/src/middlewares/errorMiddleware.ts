import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/httpException";

function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("[ERROR] ", error);
  if (error instanceof HttpException) {
    const httpError = error as HttpException;
    const status: number = httpError.status || 500;
    const message: string = httpError.message || "Something went wrong";

    console.error("[HTTP_ERROR] ", status, message);

    return res.status(status).json({ message });
  }

  return res.status(500).json({ message: "Unknown Error" });
}

export { errorMiddleware };
