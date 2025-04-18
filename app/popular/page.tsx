import { ArtworkPage } from "@/components/artwork-page";
import { getRandomEssentialsArtwork } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function Popular() {
  const artwork = await getRandomEssentialsArtwork();

  return <ArtworkPage artwork={artwork} />;
}
