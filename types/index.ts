import { artworksSchema } from "@/zod";
import { z } from "zod";

export type Artwork = z.infer<typeof artworksSchema>["data"][0];
