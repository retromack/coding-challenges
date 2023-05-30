import { z } from "zod";
import { validateRequest } from "zod-express-middleware";

export const pointPost = validateRequest({
  body: z.object({
    name: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  }),
});

export const pointDelete = validateRequest({
  params: z.object({
    id: z.string(),
  }),
});
