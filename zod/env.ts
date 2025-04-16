import { z } from "zod";

const envSchema = z.object({
  ARTSY_CLIENT_ID: z.string(),
  ARTSY_CLIENT_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);
