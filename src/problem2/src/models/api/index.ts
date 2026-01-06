export type BaseQueryParams = {
    search?: string
}

export type PaginatedResponse<T> = {
    data: T[]
    nextPage: number | null
}

export type PaginatedRequest = {
    page: number
    limit: number
} & BaseQueryParams