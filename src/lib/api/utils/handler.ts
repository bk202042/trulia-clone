import { NextRequest, NextResponse } from 'next/server';
import { ApiErrorResponse, createApiResponse } from '../types';

export type RouteContext = {
  params: { [key: string]: string };
};

export type RouteHandler = (
  req: NextRequest,
  context: RouteContext
) => Promise<Response> | Response;

export const createHandler = (handler: RouteHandler): RouteHandler => {
  return async (req: NextRequest, context: RouteContext) => {
    try {
      return await handler(req, context);
    } catch (error) {
      console.error('API Error:', error);

      if (error instanceof ApiErrorResponse) {
        return NextResponse.json(
          createApiResponse(null, {
            code: error.code,
            message: error.message,
            details: error.details,
          }),
          { status: error.status }
        );
      }

      // Handle unknown errors
      return NextResponse.json(
        createApiResponse(null, {
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected error occurred',
          details: process.env.NODE_ENV === 'development' ? error : undefined,
        }),
        { status: 500 }
      );
    }
  };
};

export const errorResponse = (
  code: string,
  message: string,
  status: number = 500,
  details?: unknown
) => {
  throw new ApiErrorResponse(code, message, status, details);
};

export const successResponse = <T>(
  data: T,
  metadata?: {
    page?: number;
    limit?: number;
    total?: number;
  }
) => {
  return NextResponse.json(createApiResponse(data, null, metadata));
};
