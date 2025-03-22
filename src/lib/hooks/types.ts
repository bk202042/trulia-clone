import { ApiResponse } from '@/lib/api/types';

export interface ApiHookResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface ApiHookResponse<T> extends ApiResponse<T> {
  metadata?: {
    page?: number;
    limit?: number;
    total?: number;
    [key: string]: unknown;
  };
}

export interface ApiErrorResponse {
  code: string;
  message: string;
  details?: unknown;
}
