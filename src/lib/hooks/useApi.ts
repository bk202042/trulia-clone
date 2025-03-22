"use client";

import { useState, useEffect, useCallback } from 'react';
import { ApiHookResult, ApiHookResponse, ApiErrorResponse } from './types';

interface UseApiOptions<T> {
  url: string;
  initialData?: T;
  immediate?: boolean;
  params?: Record<string, string>;
}

export function useApi<T>(options: UseApiOptions<T>): ApiHookResult<T> {
  const { url, initialData, immediate = true, params } = options;
  const [data, setData] = useState<T | null>(initialData || null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState<string | null>(null);

  const buildUrl = useCallback(() => {
    if (!params) return url;
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value);
      }
    });
    const queryString = searchParams.toString();
    return queryString ? `${url}?${queryString}` : url;
  }, [url, params]);

  const fullUrl = buildUrl();

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(fullUrl);
      const result: ApiHookResponse<T> = await response.json();

      if (!response.ok || result.error) {
        const errorMessage = result.error?.message || 'Failed to fetch data';
        throw new Error(errorMessage);
      }

      setData(result.data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [fullUrl, immediate]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}
