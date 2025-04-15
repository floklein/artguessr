import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { getArtwork, getToken } from "@/lib/api";
import Image from "next/image";

export default async function Home() {
  const token = await getToken();

  const artwork = await getArtwork(token);

  return (
    <main className="flex-1 flex flex-col gap-4 sm:gap-8 items-center p-4 sm:p-8">
      <Image
        src={artwork._links.image.href.replace("{image_version}", "large")}
        alt={artwork.title}
        width={500}
        height={500}
        className="m-auto flex-1 h-auto w-auto object-contain"
      />
      <div className="max-w-xl w-full flex flex-col items-center gap-6 sm:gap-8 p-6 sm:p-8 border">
        <Slider />
        <Button className="w-full max-w-xs">Submit</Button>
      </div>
    </main>
  );
}
