import { GuessForm } from "@/components/guess-form";
import { getArtwork } from "@/lib/api";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function Home() {
  const artwork = await getArtwork();

  return (
    <main className="flex-1 flex flex-col gap-4 sm:gap-8 p-4 sm:p-8 items-center">
      <Image
        src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
        alt={artwork.title}
        width={500}
        height={500}
        priority
        className="block flex-1 h-auto w-auto object-contain"
      />
      {process.env.NODE_ENV === "development" && (
        <div>
          ID: <code>{artwork.id}</code>
        </div>
      )}
      <GuessForm artwork={artwork} />
    </main>
  );
}
