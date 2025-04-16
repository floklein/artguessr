import { artworksSchema } from "@/zod";
import { z } from "zod";

export type ApiArtwork = z.infer<
  typeof artworksSchema
>["_embedded"]["artworks"][0];

export type ArtworkWithDate = ApiArtwork & { parsedDate: number };

export type ArtworkWithDateRange = ApiArtwork & {
  parsedDateRange: [number, number];
};

export type Artwork = ArtworkWithDate | ArtworkWithDateRange;

export function isArtworkWithDateRange(
  artwork: Artwork
): artwork is ArtworkWithDateRange {
  return "parsedDateRange" in artwork;
}
