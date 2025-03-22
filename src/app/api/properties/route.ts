import { NextRequest } from 'next/server';
import { createHandler, successResponse } from '@/lib/api/utils/handler';
import { propertyService } from '@/lib/services/properties/service';
import { validateQuery } from '@/lib/api/middleware/validate';
import { propertyQuerySchema } from '@/lib/api/validators/properties';

export const GET = createHandler(async (request: NextRequest) => {
  const query = validateQuery(propertyQuerySchema)(request);
  const result = await propertyService.queryProperties(query);

  return successResponse(result.data, {
    page: result.page,
    limit: result.limit,
    total: result.total
  });
});
