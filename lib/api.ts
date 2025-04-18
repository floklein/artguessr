import { ApiArtist, ApiArtwork, Artwork } from "@/types";
import {
  apiArtistSchema,
  apiArtworkSchema,
  apiArtworksSchema,
  apiArtworksSearchSchema,
  artworkSchema,
} from "@/zod";

const ARTWORKS_PAGES = 10671;
const ESSENTIALS_ARTWORKS_PAGES = 33;

export async function getRandomArtwork(retry = 0): Promise<Artwork> {
  if (retry > 10) {
    throw new Error("No valid artwork found after 10 retries");
  }
  try {
    const { data } = apiArtworksSchema.parse(
      await (
        await fetch(
          `https://api.artic.edu/api/v1/artworks?${new URLSearchParams({
            page: Math.ceil(Math.random() * ARTWORKS_PAGES).toString(),
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
      return getRandomArtwork(retry + 1);
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
    return getRandomArtwork(retry + 1);
  }
}

export async function getArtwork(id: number): Promise<Artwork> {
  const { data: artwork } = apiArtworkSchema.parse(
    await (await fetch(`https://api.artic.edu/api/v1/artworks/${id}`)).json()
  );
  const artist = await getArtist(artwork.artist_id);
  return {
    ...artwork,
    artist,
  };
}

export async function getRandomEssentialsArtwork(): Promise<Artwork> {
  const { data } = apiArtworksSearchSchema.parse(
    await (
      await fetch(
        `https://api.artic.edu/api/v1/artworks/search?query[term][category_ids]=PC-831&${new URLSearchParams(
          {
            page: Math.ceil(
              Math.random() * ESSENTIALS_ARTWORKS_PAGES
            ).toString(),
          }
        )}`
      )
    ).json()
  );
  const artwork = data[Math.floor(Math.random() * data.length)];
  return getArtwork(artwork.id);
}

export async function getArtist(id: number): Promise<ApiArtist> {
  return apiArtistSchema.parse(
    await (await fetch(`https://api.artic.edu/api/v1/artists/${id}`)).json()
  ).data;
}
