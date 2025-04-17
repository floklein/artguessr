import { artistsSchema, artworksSchema } from "@/zod";
import { z } from "zod";

export type ApiArtwork = z.infer<
  typeof artworksSchema
>["_embedded"]["artworks"][0];

export type WithDate = {
  parsedDate: number;
};

export type WithDateRange = {
  parsedDateRange: [number, number];
};

export type Artists = z.infer<typeof artistsSchema>["_embedded"]["artists"];

export type WithArtists = {
  artists: Artists;
};

export type Artwork = ApiArtwork & (WithDate | WithDateRange) & WithArtists;
