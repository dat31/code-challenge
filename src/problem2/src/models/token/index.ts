import { z } from "zod"

export const TokenSchema = z.object({
    currency: z.string(),
    date: z.string(),
    price: z.number(),
})

export type Token = z.infer<typeof TokenSchema>