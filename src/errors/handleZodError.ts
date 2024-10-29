import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorMessage } from '../interfaces/error';
import { IGenericErrorResponse } from '../interfaces/common';

const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const statusCode = 400;
  const errors: IGenericErrorMessage[] = error.issues.map(
    (issue: ZodIssue) => ({
      path: issue.path[issue.path.length - 1],
      message: issue.message
    })
  );
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors
  };
};

export default handleZodError;
