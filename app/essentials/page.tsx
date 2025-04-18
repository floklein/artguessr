import { GuessForm } from "@/components/guess-form";
import { getRandomEssentialsArtwork } from "@/lib/api";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function Essentials() {
  const artwork = await getRandomEssentialsArtwork();

  return (
    <main className="flex-1 flex flex-col gap-4 sm:gap-8 p-4 sm:p-8 items-center overflow-hidden">
      <div className="flex-1 overflow-hidden">
        <Image
          id={artwork.id.toString()}
          src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
          alt={artwork.title}
          width={500}
          height={500}
          priority
          className="object-contain w-full h-full"
        />
      </div>
      <GuessForm artwork={artwork} />
    </main>
  );
}
