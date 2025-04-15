import { artworksSchema, env, xappTokenSchema } from "@/zod";

export async function getToken() {
  const { token } = xappTokenSchema.parse(
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
  return token;
}

export async function getArtworks(token: string) {
  return artworksSchema.parse(
    await (
      await fetch("https://api.artsy.net/api/artworks", {
        headers: {
          "X-Xapp-Token": token,
        },
      })
    ).json()
  );
}
