import { ApiArtwork, Artwork } from "@/types";
import { artistSchema, artworkSchema, artworksSchema } from "@/zod";

const ARTWORKS_LENGTH = 10671;

export async function getArtwork(retry = 0): Promise<Artwork> {
  if (retry > 10) {
    throw new Error("No valid artwork found after 10 retries");
  }
  try {
    const { data } = artworksSchema.parse(
      await (
        await fetch(
          `https://api.artic.edu/api/v1/artworks?${new URLSearchParams({
            page: Math.ceil(Math.random() * ARTWORKS_LENGTH).toString(),
          })}`
        )
      ).json()
    );
    const artworks = data.reduce<ApiArtwork[]>((acc, artwork) => {
      const { success, data: parsed } = artworkSchema.safeParse(artwork);
      if (success) {
        acc.push(parsed);
      }
      return acc;
    }, []);
    if (artworks.length === 0) {
      return getArtwork(retry + 1);
    }
    const artwork = artworks[Math.floor(Math.random() * artworks.length)];
    const artist = await getArtist(artwork.artist_id);
    return {
      ...artwork,
      artist,
    };
  } catch (error) {
    console.error(error);
    console.log("retry", retry + 1);
    return getArtwork(retry + 1);
  }
}

export async function getArtist(id: number) {
  return artistSchema.parse(
    await (await fetch(`https://api.artic.edu/api/v1/artists/${id}`)).json()
  ).data;
}
