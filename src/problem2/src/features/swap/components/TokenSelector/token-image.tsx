import { useState } from "react";

import env from "@/configs/env";
import logger from "@/configs/logger";
import type { Token } from "@/models/token";

type Props = {
    currency: Token["currency"]
}

export default function TokenImage({ currency }: Props) {

    const [src, setSrc] = useState(`${env.CDN_URL}/tokens/${currency}.svg`)

    function handleError(error: React.SyntheticEvent<HTMLImageElement, Event>) {
        logger.error(error)
        setSrc(`/token.svg`)
    }

    return <img onError={handleError} src={src} alt={currency} className="w-6 h-6" />
}