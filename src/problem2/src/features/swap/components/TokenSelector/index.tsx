import "react-virtualized/styles.css";

import { isEmpty } from "lodash";
import { Search } from "lucide-react";
import { memo, useCallback, useEffect, useMemo, useState } from "react"
import { AutoSizer, List, type ScrollParams } from "react-virtualized";

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import useTokenInfiniteQuery from "@/hooks/use-token-infinite-query"
import { cn } from "@/lib/utils";
import type { Token } from "@/models/token";

import TokenImage from "./token-image";

const SCROLL_THRESHOLD = 10

type Props = {
    onChange(token: Token): void
    value: Token
    excludedToken: Token
}

function TokenSelector({ onChange, value, excludedToken }: Props) {

    const [search, setSearch] = useState('')
    const { data, fetchNextPage, hasNextPage } = useTokenInfiniteQuery(search)

    const tokens = useMemo(() => {
        return data
            ?.pages
            .flatMap((page) => page.data) ?? []
    }, [data])

    const onScroll = useCallback(({ scrollTop, clientHeight, scrollHeight }: ScrollParams) => {
        if (!hasNextPage) {
            return
        }
        if (scrollTop + clientHeight < scrollHeight - SCROLL_THRESHOLD) {
            return
        }
        fetchNextPage()
    }, [hasNextPage, fetchNextPage])

    const rowRenderer = useCallback(({ index, key, style }: { index: number, key: string, style: React.CSSProperties }) => {
        const token = tokens[index]
        const { currency } = token
        return (
            <div key={key} style={style} className="p-4">
                <Button variant={"outline"} onClick={() => onChange(token)} className={
                    cn("pixel-block pixel-button hover:bg-gray-200 px-3 h-16 gap-2 w-full flex items-center rounded-none justify-start",
                        value?.currency === currency ? "bg-pixel-yellow" : "bg-gray-100 hover:bg-pixel-blue hover:text-white",
                        excludedToken?.currency === currency && "opacity-30 grayscale cursor-not-allowed"
                    )
                }>
                    <TokenImage currency={currency} />
                    {currency}
                </Button>
            </div>
        )
    }, [onChange, tokens, value, excludedToken])

    useEffect(() => {
        if (isEmpty(tokens)) {
            return
        }
        if(value) {
            return;
        }
        onChange(tokens[0])
    }, [value, tokens, onChange])

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="pixel-block justify-start w-32 font-bold pixel-button bg-pixel-red text-white hover:bg-pixel-red/80 px-3 h-12 gap-2 flex items-center border-2 border-black">
                    <TokenImage currency={value?.currency} />
                    {value?.currency ?? "Loading"}
                </Button>
            </DialogTrigger>
            <DialogContent className="pixel-block gap-0 bg-white p-0 border-4 border-black sm:max-w-[425px]">
                <DialogHeader className="bg-pixel-blue text-white p-4 font-black italic uppercase flex items-start gap-4 border-b-4 border-black">
                    <DialogTitle className="pixel-text">Select a token</DialogTitle>
                    <DialogDescription className="hidden">Select a token to swap</DialogDescription>
                    <InputGroup className="bg-white text-black border-2 border-black rounded-none">
                        <InputGroupInput value={search} onChange={(e) => setSearch(e.target.value)} />
                        <InputGroupAddon>
                            <Search />
                        </InputGroupAddon>
                    </InputGroup>
                </DialogHeader>
                <div className="h-[380px]">
                    <AutoSizer>
                        {({ width, height }) => (
                            <List
                                onScroll={onScroll}
                                width={width}
                                height={height}
                                rowCount={tokens.length}
                                rowHeight={80}
                                rowRenderer={rowRenderer}
                            />
                        )}
                    </AutoSizer>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default memo(TokenSelector)