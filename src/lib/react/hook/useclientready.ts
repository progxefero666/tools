//src\lib\react\hook\useclientready.ts

import { useState, useEffect } from "react";

export function useClientReady() {
    const [clientReady, setClientReady] = useState(false);
    useEffect(() => {
        setClientReady(true);
    }, []);
    return clientReady;
}
