import { zodResolver } from "@hookform/resolvers/zod";
import { isEmpty, noop } from "lodash";
import { ArrowDownUp, Coins, Heart } from "lucide-react";
import { useEffect } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";

import SwapFormSchema from "../../validator";
import SwapField from "../SwapField";

export default function SwapForm() {

    const form = useForm({
        resolver: zodResolver(SwapFormSchema),
        mode: "onChange",
    })
    const { setValue, getValues, control } = form
    const fromAmount = useWatch({ control, name: "fromAmount" })
    const fromToken = useWatch({ control, name: "fromToken" })
    const toToken = useWatch({ control, name: "toToken" })

    function reverseSwap() {
        const tempFromToken = getValues("fromToken")
        setValue("fromToken", getValues("toToken"))
        setValue("toToken", tempFromToken)
    }

    useEffect(() => {
        if (isNaN(Number(fromAmount))) {
            return
        }
        if (isEmpty(fromToken) || isEmpty(toToken)) {
            return
        }
        setValue("toAmount",
            String((Number(fromAmount) * (toToken.price ?? 0) / (fromToken.price ?? 0)).toFixed(2)))
    }, [fromAmount, fromToken, toToken, setValue])

    return (
        <div className="pixel-block m-auto w-full md:w-2/3 lg:w-1/3 bg-white overflow-hidden relative border-4 border-black shadow-[8px_8px_0_0_#000]">
            <div className="brick-pattern h-12 flex items-center px-4 border-b-4 border-black">
                <span className="pixel-text text-white font-black italic tracking-widest text-lg uppercase flex items-center gap-2">
                    <Coins className="size-6 fill-pixel-yellow text-black" />
                    Swap_Form_101
                </span>
            </div>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(noop)} className="gap-4 pixel-block m-auto flex flex-col justify-center">
                    <div className="flex flex-col gap-4 px-6 py-8">
                        <SwapField
                            tokenFieldName="fromToken"
                            inputFieldName="fromAmount"
                            excludedToken={toToken} />
                        <Button onClick={reverseSwap} className="pixel-block mx-auto pixel-button bg-pixel-yellow text-white hover:bg-pixel-red/80 px-3 size-12 md:size-14 gap-2 flex items-center border-2 border-black rounded-none">
                            <ArrowDownUp className="stroke-3" />
                        </Button>
                        <SwapField
                            inputFieldName="toAmount"
                            tokenFieldName="toToken"
                            disabled
                            excludedToken={fromToken} />
                    </div>
                    <div className="bg-black text-pixel-yellow p-2 flex justify-between text-[10px] font-bold border-t-4 border-black uppercase italic">
                        <p>Score: 000420</p>
                        <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4 fill-pixel-red" />
                            <Heart className="w-4 h-4 fill-pixel-red" />
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}