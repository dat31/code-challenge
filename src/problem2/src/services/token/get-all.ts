import { chain } from "lodash"

import type { PaginatedRequest, PaginatedResponse } from "@/models/api"
import { type Token,TokenSchema } from "@/models/token"

export default async function getAllTokens({
    page,
    limit,
    search,
}: PaginatedRequest): Promise<PaginatedResponse<Token>> {
    const response = await fetch('/mock.json')

console.log("response", response)

    const data = await response.json()
    const parsed = data.map(TokenSchema.parse)
    const hasNext = (page + 1) * limit < parsed.length

    return {
        data: chain(parsed)
            .slice(page * limit, (page + 1) * limit)
            .filter((token: Token) => token.currency.toLowerCase().includes(search?.toLowerCase() ?? ''))
            .value(),
        nextPage: hasNext ? (page + 1) : null,
    }
}