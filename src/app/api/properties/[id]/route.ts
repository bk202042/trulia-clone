import { NextRequest } from 'next/server';
import { z } from 'zod';
import { createHandler, successResponse, RouteContext } from '@/lib/api/utils/handler';
import { propertyService } from '@/lib/services/properties/service';
import { validateParams } from '@/lib/api/middleware/validate';
import { propertyIdSchema } from '@/lib/api/validators/properties';

export const GET = createHandler(async (request: NextRequest, context: RouteContext) => {
  const { id } = validateParams(z.object({ id: propertyIdSchema }))(context.params);
  const property = await propertyService.getPropertyById(id);
  return successResponse(property);
});
