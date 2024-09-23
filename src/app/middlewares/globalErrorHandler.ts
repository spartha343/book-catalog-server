/* eslint-disable no-console */
import { ErrorRequestHandler } from "express";
import config from "../../config";

// import { errorLogger } from '../../shared/logger';
import { ZodError } from "zod";
import ApiError from "../../errors/ApiError";
import handleCastError from "../../errors/handleCastError";
import { IGenericErrorMessage } from "../../interfaces/error";
import handleZodError from "../../errors/handleZodError";
import handleValidationError from "../../errors/handleValidationError";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // eslint-disable-next-line no-unused-expressions
  config.env === "development"
    ? // eslint-disable-next-line no-console
      console.log("🚀Global Error Handler", error)
    : console.log("🚀Global Error Handler", error);

  let statusCode = 500;
  let message = "Something went wrong !";
  let errorMessages: IGenericErrorMessage[] = [];

  if (error?.name === "ValidationError") {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error?.name === "CastError") {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message
          }
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error.message
          }
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== "production" ? error?.stack : undefined
  });
};

export default globalErrorHandler;
