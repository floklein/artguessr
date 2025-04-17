import { Artwork } from "@/types";
import { artworksSchema } from "@/zod";

const ARTWORKS_LENGTH = 10671;

export async function getArtwork(retry = 0): Promise<Artwork> {
  if (retry > 10) {
    throw new Error("No artwork with valid date found after 10 retries");
  }
  const response = artworksSchema.safeParse(
    await (
      await fetch(
        `https://api.artic.edu/api/v1/artworks?${new URLSearchParams({
          page: Math.ceil(Math.random() * ARTWORKS_LENGTH).toString(),
        })}`
      )
    ).json()
  );
  if (!response.success) {
    console.log("retry", retry);
    return getArtwork(retry + 1);
  }
  return response.data.data[
    Math.floor(Math.random() * response.data.data.length)
  ];
}
