import { z } from 'zod';

export const propertyQuerySchema = z.object({
  city: z.string().optional(),
  minPrice: z.coerce.number().positive().optional(),
  maxPrice: z.coerce.number().positive().optional(),
  propertyType: z.string().optional(),
  limit: z.coerce.number().min(1).max(50).default(10),
  offset: z.coerce.number().min(0).default(0),
}).refine(data => {
  if (data.minPrice && data.maxPrice) {
    return data.minPrice <= data.maxPrice;
  }
  return true;
}, {
  message: "minPrice must be less than or equal to maxPrice",
  path: ["minPrice"]
});

export const propertyIdSchema = z.string().uuid({
  message: "Invalid property ID format"
});

export type PropertyQueryParams = z.infer<typeof propertyQuerySchema>;
