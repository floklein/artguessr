import { ApiArtwork, Artwork, WithDate, WithDateRange } from "@/types";
import { artistsSchema, artworksSchema, xappTokenSchema } from "@/zod";
import { env } from "@/zod/env";
import { findMap } from "./utils";

const ARTWORKS_LENGTH = 27577;

export async function getToken() {
  return xappTokenSchema.parse(
    await (
      await fetch("https://api.artsy.net/api/tokens/xapp_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: env.ARTSY_CLIENT_ID,
          client_secret: env.ARTSY_CLIENT_SECRET,
        }),
      })
    ).json()
  );
}

export async function getArtists(token: string, href: string) {
  const response = await (
    await fetch(href, {
      headers: {
        "X-Xapp-Token": token,
      },
    })
  ).json();
  return artistsSchema.parse(response);
}

export async function getArtwork(token: string, retry = 0): Promise<Artwork> {
  if (retry > 10) {
    throw new Error("No artwork with valid date found after 10 retries");
  }
  const {
    _embedded: { artworks },
  } = artworksSchema.parse(
    await (
      await fetch(
        `https://api.artsy.net/api/artworks?${new URLSearchParams({
          size: "1",
          offset: Math.floor(Math.random() * ARTWORKS_LENGTH).toString(),
        })}`,
        {
          headers: {
            "X-Xapp-Token": token,
          },
        }
      )
    ).json()
  );
  const artwork = findMap<ApiArtwork, ApiArtwork & (WithDate | WithDateRange)>(
    artworks,
    (artwork) => {
      const date = artwork.date.match(/\d{3,4}/);
      const bc = artwork.date.match(/\bb\W?c\b/i);
      if (!date || date.length > 2 || bc) {
        console.log("Invalid date:", artwork.date);
        return undefined;
      }
      if (date.length === 2) {
        return {
          ...artwork,
          parsedDateRange: [parseInt(date[0]), parseInt(date[1])],
        };
      } else {
        return {
          ...artwork,
          parsedDate: parseInt(date[0]),
        };
      }
    }
  );
  if (!artwork) {
    return await getArtwork(token, retry + 1);
  }
  const {
    _embedded: { artists },
  } = await getArtists(token, artwork._links.artists.href);
  return {
    ...artwork,
    artists,
  };
}
