import { z } from "zod";

export const artworkSchema = z.object({
  id: z.number(),
  title: z.string(),
  date_display: z.string(),
  date_start: z.number(),
  date_end: z.number(),
  artist_id: z.number(),
  artist_title: z.string(),
  image_id: z.string(),
});

export const artworksSchema = z.object({
  data: z.array(artworkSchema.partial()),
});

export const artistSchema = z.object({
  data: z.object({
    id: z.number(),
    title: z.string(),
    birth_date: z.number().nullable(),
    death_date: z.number().nullable(),
  }),
});
