export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
  metadata?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

export class ApiErrorResponse extends Error {
  constructor(
    public code: string,
    message: string,
    public status: number = 500,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApiErrorResponse';
  }
}

export const createApiResponse = <T>(
  data: T | null = null,
  error: ApiError | null = null,
  metadata?: ApiResponse<T>['metadata']
): ApiResponse<T> => ({
  data,
  error,
  metadata,
});
