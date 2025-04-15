import { artworksSchema, env, xappTokenSchema } from "@/zod";

// const ARTWORKS_LENGTH = 27577;

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

export async function getArtwork(token: string) {
  return artworksSchema.parse(
    await (
      await fetch(
        `https://api.artsy.net/api/artworks?${new URLSearchParams({
          size: "1",
          offset: Math.floor(Math.random() * 100).toString(),
        })}`,
        {
          headers: {
            "X-Xapp-Token": token,
          },
        }
      )
    ).json()
  )._embedded.artworks[0];
}
