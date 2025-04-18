import { ArtworkPage } from "@/components/artwork-page";
import { getRandomArtwork } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function Home() {
  const artwork = await getRandomArtwork();

  return <ArtworkPage artwork={artwork} />;
}
