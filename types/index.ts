import { apiArtistSchema, artworkSchema } from "@/zod";
import { z } from "zod";

export type ApiArtwork = z.infer<typeof artworkSchema>;

export type ApiArtist = z.infer<typeof apiArtistSchema>["data"];

export type Artwork = ApiArtwork & {
  artist: ApiArtist;
};
