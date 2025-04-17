import { z } from "zod";

export const artworksSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      date_display: z.string(),
      date_start: z.number(),
      date_end: z.number(),
      artist_display: z.string(),
      thumbnail: z.object({
        lqip: z.string(),
        width: z.number(),
        height: z.number(),
        alt_text: z.string(),
      }),
      image_id: z.string(),
    })
  ),
});
