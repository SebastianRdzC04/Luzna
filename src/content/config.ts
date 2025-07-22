import { defineCollection, z } from "astro:content";
import { file } from "astro/loaders";

const guest = defineCollection({
    loader: file("src/content/invitados/invitados.json"),
    schema: z.object({
        id: z.number().int().min(1),
        name: z.string(),
        numberOfGuests: z.number().int().min(1).max(10),
    }),
})

export const collections = { guest };