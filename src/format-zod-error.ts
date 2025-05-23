import { ZodError } from 'zod';

export const formatZodError = (error: ZodError) => {
  return error.errors.reduce(
    (acc, curr) => {
      const path = curr.path.join('.');
      acc[path] = curr.message;
      return acc;
    },
    {} as Record<string, string>,
  );
};
