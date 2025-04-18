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

export const apiArtworkSchema = z.object({
  data: artworkSchema,
});

export const apiArtworksSchema = z.object({
  data: z.array(
    z
      .object({
        id: z.number().nullable(),
        title: z.string().nullable(),
        date_display: z.string().nullable(),
        date_start: z.number().nullable(),
        date_end: z.number().nullable(),
        artist_id: z.number().nullable(),
        artist_title: z.string().nullable(),
        image_id: z.string().nullable(),
      })
      .partial()
  ),
});

export const apiArtworkFields =
  "id,title,date_display,date_start,date_end,artist_id,artist_title,image_id";

export const apiArtistSchema = z.object({
  data: z.object({
    id: z.number(),
    title: z.string(),
    birth_date: z.number().nullable(),
    death_date: z.number().nullable(),
  }),
});

export const apiArtistFields = "id,title,birth_date,death_date";

export const apiArtworksSearchSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
    })
  ),
});

export const apiArtworksSearchFields = "id";
