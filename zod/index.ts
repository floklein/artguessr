import { z } from "zod";

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
