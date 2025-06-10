//src\app\page.tsx

"use client";

import { useEffect } from "react";

import Desktop from "./desktop/page";
import "@/css/allwidths.css";
import { useClientReady } from "@/lib/react/hook/useclientready";

/**
 * Main app view page component
 * 
 */
export default function Home() {
    
    useEffect(() => {
    }, []);
    
    const clientReady = useClientReady();
    if (!clientReady) { return <div>Loading...</div>; }
 
    const render = () => {
        const mode: number = 0;
        switch (mode) {
            case 0: return <Desktop />;
        }
    }
    
    return (
        <div id="cont_root" className={"w-full h-auto"} >            
            {render()}
        </div>
    );

}//end comp

/*
        if (!AppStorageService.isUserLogin()) {
            userlogin().then((userId) => {
                AppStorageService.saveUserId(userId);
            });        
        }
        if (!AppStorageService.isDeviceCharged()) {
            AppStorageService.saveUserDevice(DeviceUtil.getDevice());
        }
    const render = () => {
        const mode: number = 0;
        //<PageHeader />
        switch (mode) {
            case 0: return <Desktop />;
            case 1: return <WebglPage />            
            case 2: return <PageTest />;
            case 3: return <PageVideoPlayer />;
            case 4: return <PageGoogleCloudTest />;
            case 5: return <PageGeometry />;
        }
    };
*/