import { memo } from "react"
import { useFormContext } from "react-hook-form"

import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { Token } from "@/models/token"

import TokenSelector from "../TokenSelector"

type Props = {
    inputFieldName: string;
    tokenFieldName: string;
    disabled?: boolean;
    excludedToken: Token;
}

function SwapField({ inputFieldName, tokenFieldName, disabled, excludedToken }: Props) {

    const { getValues, setValue, control } = useFormContext()

    function handleTokenChange(token: Token) {
        setValue(tokenFieldName, token)
    }

    return (
        <div className="flex pixel-block bg-gray-100 p-4 items-center gap-4">
            <FormField
                control={control}
                name={inputFieldName}
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormControl>
                            <Input
                                {...field}
                                placeholder="0.00"
                                className="rounded-none border-none shadow-none bg-transparent p-0 italic font-black focus-visible:ring-0 focus-visible:ring-offset-0"
                                type="number"
                                disabled={disabled} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <TokenSelector
                excludedToken={excludedToken}
                onChange={handleTokenChange}
                value={getValues(tokenFieldName)} />
        </div>
    )
}

export default memo(SwapField)