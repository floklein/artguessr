import { z } from "zod";

const envSchema = z.object({
  ARTSY_CLIENT_ID: z.string(),
  ARTSY_CLIENT_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);

export const xappTokenSchema = z.object({
  token: z.string(),
});

export const artworksSchema = z.object({
  _embedded: z.object({
    artworks: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        date: z.string(),
        _links: z.object({
          image: z.object({
            href: z.string(),
          }),
        }),
      })
    ),
  }),
});

export type Artwork = z.infer<
  typeof artworksSchema
>["_embedded"]["artworks"][0];
