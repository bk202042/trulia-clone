import { NextRequest } from 'next/server';
import { z } from 'zod';
import { errorResponse } from '../utils/handler';

export const validateQuery = <T extends z.ZodType>(schema: T) => {
  return (request: NextRequest) => {
    const searchParams = Object.fromEntries(request.nextUrl.searchParams.entries());
    const result = schema.safeParse(searchParams);

    if (!result.success) {
      throw errorResponse(
        'VALIDATION_ERROR',
        'Invalid query parameters',
        400,
        result.error.flatten()
      );
    }

    return result.data as z.infer<T>;
  };
};

export const validateParams = <T extends z.ZodType>(schema: T) => {
  return (params: Record<string, string>) => {
    const result = schema.safeParse(params);

    if (!result.success) {
      throw errorResponse(
        'VALIDATION_ERROR',
        'Invalid parameters',
        400,
        result.error.flatten()
      );
    }

    return result.data as z.infer<T>;
  };
};
