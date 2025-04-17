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
          artists: z.object({
            href: z.string(),
          }),
        }),
      })
    ),
  }),
});

export const artistsSchema = z.object({
  _embedded: z.object({
    artists: z.array(
      z.object({
        id: z.string(),
        slug: z.string(),
        name: z.string(),
        biography: z.string(),
        birthday: z.string(),
        deathday: z.string(),
        nationality: z.string(),
        location: z.string(),
        _links: z.object({
          image: z.object({
            href: z.string(),
          }),
          thumbnail: z.object({
            href: z.string(),
          }),
          permalink: z.object({
            href: z.string(),
          }),
        }),
      })
    ),
  }),
});
