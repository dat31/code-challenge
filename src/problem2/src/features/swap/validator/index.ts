import { z } from "zod";

import { TokenSchema } from "@/models/token";

export default z.object({
    fromAmount: z
        .string()
        .trim()
        .transform(Number)
        .refine((val) => !isNaN(Number(val)), {
            message: "Must be a number",
        })
        .refine((val) => Number(val) > 0, {
            message: "Must be greater than 0",
        }),
    toAmount: z.string(),
    fromToken: TokenSchema,
    toToken: TokenSchema,
})  