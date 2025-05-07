"use client";

import { useEffect } from "react";
import { AppStorageService } from "@/common/storage/appstrclient";
import { userlogin } from "@/application/server/userlogin";
import { AppUI, useClientReady } from "@/style/appui";

import PageClient from "./pageclient";
import PageHeader from "@/components/page/pageheader";
import PageTest from "./pagetest";
import PageVideoPlayer from "./test/video/page";

import "@/css/allwidths.css"; 
import { DeviceUtil } from "@/common/util/devicehelper";
import PageGoogleCloudTest from "./googlecloud/test/page";


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
        const mode: number = 1;
        //<PageHeader />
        switch (mode) {
            case 1: return <PageClient />;
            case 2: return <PageTest />;
            case 3: return <PageVideoPlayer />;
            case 4: return <PageGoogleCloudTest />;
        }
    };
    return (
        <div id="cont_root" className={getRootClassName()} >            
            {render()}
        </div>
    );

}//end comp
