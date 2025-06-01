"use client";

import { useEffect } from "react";
import { AppStorageService } from "@/common/storage/appstrclient";
import { userlogin } from "@/application/server/userlogin";
import { AppUI, useClientReady } from "@/style/appui";
import { DeviceUtil } from "@/common/util/devicehelper";

import PageClient from "./pageclient";
import PageTest from "./pagetest";
import PageVideoPlayer from "./test/video/page";
import PageGoogleCloudTest from "./googlecloud/test/page";

import "@/css/allwidths.css"; 
import WebglPage from "./webgl/page";
import PageGeometry from "./geometry/page";

/**
 * Main app view page component
 * 
 */
export default function Home() {
    
    useEffect(() => {
        if (!AppStorageService.isUserLogin()) {
            userlogin().then((userId) => {
                AppStorageService.saveUserId(userId);
            });        
        }
        if (!AppStorageService.isDeviceCharged()) {
            AppStorageService.saveUserDevice(DeviceUtil.getDevice());
        }
    }, []);
    

    const clientReady = useClientReady();
    if (!clientReady) { return <div>Loading...</div>; }

    function getRootClassName() {
        const device =window.screen;
        return AppUI.getRootContainerWidthClass(device.width);
    }
  
    const render = () => {
        const mode: number = 5;
        //<PageHeader />
        switch (mode) {
            case 0: return <WebglPage />
            case 1: return <PageClient />;
            case 2: return <PageTest />;
            case 3: return <PageVideoPlayer />;
            case 4: return <PageGoogleCloudTest />;
            case 5: return <PageGeometry />;
        }
    };
    return (
        <div id="cont_root" className={getRootClassName()} >            
            {render()}
        </div>
    );

}//end comp
