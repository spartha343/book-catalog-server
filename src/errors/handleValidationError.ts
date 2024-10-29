import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interfaces/error';
import { IGenericErrorResponse } from '../interfaces/common';

const handleValidationError = (
  error: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(error.errors).map(e => {
    return {
      path: e?.path,
      message: e?.message
    };
  });

  const statusCode = 400;
  return {
    statusCode,
    errorMessages: errors,
    message: 'Validation Error'
  };
};

export default handleValidationError;
