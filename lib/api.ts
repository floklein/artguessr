import { ApiArtist, ApiArtwork, Artwork } from "@/types";
import {
  apiArtistFields,
  apiArtistSchema,
  apiArtworkFields,
  apiArtworkSchema,
  apiArtworksSchema,
  apiArtworksSearchFields,
  apiArtworksSearchSchema,
  artworkSchema,
} from "@/zod";

const ARTWORKS_PAGES = 10671;
const ESSENTIALS_ARTWORKS_PAGES = 33;

export async function getRandomArtwork(retry = 0): Promise<Artwork> {
  if (retry > 10) {
    throw new Error("No valid artwork found after 10 retries");
  }
  if (retry > 0) {
    console.log("retry", retry);
  }
  try {
    const { data } = apiArtworksSchema.parse(
      await (
        await fetch(
          `https://api.artic.edu/api/v1/artworks?${new URLSearchParams({
            page: Math.ceil(Math.random() * ARTWORKS_PAGES).toString(),
            fields: apiArtworkFields,
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
      return await getRandomArtwork(retry + 1);
    }
    const artwork = artworks[Math.floor(Math.random() * artworks.length)];
    const artist = await getArtist(artwork.artist_id);
    return {
      ...artwork,
      artist,
    };
  } catch (error) {
    console.error(error);
    return await getRandomArtwork(retry + 1);
  }
}

export async function getArtwork(id: number): Promise<Artwork> {
  const { data: artwork } = apiArtworkSchema.parse(
    await (
      await fetch(
        `https://api.artic.edu/api/v1/artworks/${id}?${new URLSearchParams({
          fields: apiArtworkFields,
        })}`
      )
    ).json()
  );
  const artist = await getArtist(artwork.artist_id);
  return {
    ...artwork,
    artist,
  };
}

export async function getRandomEssentialsArtwork(retry = 0): Promise<Artwork> {
  if (retry > 10) {
    throw new Error("No valid artwork found after 10 retries");
  }
  if (retry > 0) {
    console.log("retry", retry);
  }
  try {
    const { data } = apiArtworksSearchSchema.parse(
      await (
        await fetch(
          `https://api.artic.edu/api/v1/artworks/search?${new URLSearchParams({
            "query[term][category_ids]": "PC-831",
            page: Math.ceil(
              Math.random() * ESSENTIALS_ARTWORKS_PAGES
            ).toString(),
            fields: apiArtworksSearchFields,
          })}`
        )
      ).json()
    );
    let artwork: Artwork | null = null;
    while (data.length && !artwork) {
      try {
        const randomIndex = Math.floor(Math.random() * data.length);
        const searchResult = data.splice(randomIndex, 1)[0];
        artwork = await getArtwork(searchResult.id);
        break;
      } catch (error) {
        console.error(error);
      }
    }
    if (!artwork) {
      return await getRandomEssentialsArtwork(retry + 1);
    }
    return artwork;
  } catch (error) {
    console.error(error);
    return await getRandomEssentialsArtwork(retry + 1);
  }
}

export async function getArtist(id: number): Promise<ApiArtist> {
  return apiArtistSchema.parse(
    await (
      await fetch(
        `https://api.artic.edu/api/v1/artists/${id}?${new URLSearchParams({
          fields: apiArtistFields,
        })}`
      )
    ).json()
  ).data;
}
