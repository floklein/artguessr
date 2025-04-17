import { GuessForm } from "@/components/guess-form";
import { getArtwork, getToken } from "@/lib/api";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { token } = await getToken();

  const artwork = await getArtwork(token);

  return (
    <main className="flex-1 flex flex-col gap-4 sm:gap-8 p-4 sm:p-8 items-center">
      <Image
        src={artwork._links.image.href.replace("{image_version}", "large")}
        alt={artwork.title}
        width={500}
        height={500}
        priority
        className="block flex-1 h-auto w-auto object-contain"
      />
      <GuessForm artwork={artwork} />
    </main>
  );
}
