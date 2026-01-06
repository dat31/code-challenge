import { useInfiniteQuery } from "@tanstack/react-query"

import { getAllTokens } from "@/services/token"

function useTokenInfiniteQuery(search?: string) {
    return useInfiniteQuery({
        queryKey: useTokenInfiniteQuery.key(search),
        queryFn: ({ pageParam = 0 }) => getAllTokens({ page: pageParam, limit: 10, search }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        initialPageParam: 0,
    })
}

useTokenInfiniteQuery.key = function (search?: string) {
    return ['tokens', search]
}

export default useTokenInfiniteQuery