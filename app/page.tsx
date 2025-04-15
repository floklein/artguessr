import { getArtworks, getToken } from "@/lib/api";
import Image from "next/image";

export default async function Home() {
  const token = await getToken();

  const {
    _embedded: { artworks },
  } = await getArtworks(token);

  return (
    <div>
      {artworks.map((artwork) => (
        <div key={artwork.id}>
          <h2>{artwork.title}</h2>
          <Image
            src={artwork._links.image.href.replace("{image_version}", "large")}
            alt={artwork.title}
            width={500}
            height={500}
          />
        </div>
      ))}
    </div>
  );
}
