import { NextRequest } from 'next/server';
import { createHandler, successResponse } from '@/lib/api/utils/handler';
import { propertyService } from '@/lib/services/properties/service';

import { z } from 'zod';
import { validateQuery } from '@/lib/api/middleware/validate';

const featuredQuerySchema = z.object({
  limit: z.coerce.number().min(1).max(10).default(4)
});

export const GET = createHandler(async (request: NextRequest) => {
  const { limit } = validateQuery(featuredQuerySchema)(request);
  const featuredProperties = await propertyService.getFeaturedProperties(limit);
  return successResponse(featuredProperties, { limit });
});
