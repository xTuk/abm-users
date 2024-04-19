import { ValidationError } from "express-validator";

export const formatError = (errors: ValidationError[]): string => {
  const filteredErr = errors
    .map((error) => error.msg)
    .filter((error) => error !== "Invalid value");
  return filteredErr.join(". ");
};
