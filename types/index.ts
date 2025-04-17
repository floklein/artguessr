import { artistSchema, artworkSchema } from "@/zod";
import { z } from "zod";

export type ApiArtwork = z.infer<typeof artworkSchema>;

export type ApiArtist = z.infer<typeof artistSchema>["data"];

export type Artwork = ApiArtwork & {
  artist: ApiArtist;
};
