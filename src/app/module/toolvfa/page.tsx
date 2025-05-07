"use client";

import { useEffect, useState } from "react";
import { AppUI, useClientReady } from "@/style/appui";
import { AppStorageService } from "@/common/storage/appstrclient";
import { FrontData, FrontProcess, ServerProcess } from "@/application/toolvfa/vfactrbase";
import { createUserToolFolders} from "@/application/server/serverservice"; 
import { XImage } from "@/multimedia/model/ximage";
import { VfaVideo } from "@/application/toolvfa/vfavideo";

import PageHeader from "@/components/page/pageheader";
import ToolVfaPageStep1 from "./views/viewstep1";
import ToolVfaPageStep3 from "./views/viewstep3";

// view:css
import "@/css/allwidths.css";
import ToolVfaPageStep2 from "./views/viewstep2";
import { VfaVideoMData } from "@/application/toolvfa/motor/vfavigendata";


/**
 * Tool VFA Page Root Component
 */
const userId = AppStorageService.readUserId();

let prodVideo: VfaVideo;

export default function ToolVfaPage() {
    const [stepIndex, setstepIndex] = useState<number>(1);

    const processStep1 = (vfaVideo: VfaVideo) => {
        prodVideo  =vfaVideo;
        prodVideo.loadInitParams();
        createUserToolFolders(userId).then((result) => {
            if (result) {
                ServerProcess.storeDataStep1(userId,vfaVideo).then((result2) => {
                    if (result2) {
                        setstepIndex(stepIndex + 1);
                    }
                    else {alert("Error storeDataStep1");}
                })            
            }
            else { alert("Error createUserToolFolders"); }
        })        
    };

    const processStep2 = (elements: XImage[]) => {
        prodVideo.setElements(elements);
        ServerProcess.storeDataStep2(userId, prodVideo).then((result) => {
            if (result) {
                setstepIndex(stepIndex + 1);
            }
            else { alert("Error process Step 2"); }
        });              
    }

    const showEndGeneration = () => {
        
    }

    const clientReady = useClientReady();
    if (!clientReady) { return <div>Loading...</div>; }

    const renderStep = () => {
        switch (stepIndex) {
            //case 0: return <ToolVfaPageStep0 process={processTest} />
            case 1: return <ToolVfaPageStep1 process={processStep1}                                            
                                             formBase={FrontData.FORM_A} />;
            case 2: return <ToolVfaPageStep2 tvideo={prodVideo}
                                             process={processStep2} />;
            case 3: return <ToolVfaPageStep3 userId={userId}                                            
                                             callendgeneration={showEndGeneration} />;
        }
    };

    // className={getRootClassName()} "w-300"
    const getRootClassName = () => {
        //const device = window.screen;
        const device = AppUI.getBrowserDimension();
        return AppUI.getRootContainerWidthClass(device.width);
    }

    return (
        <div id="cont_root" className={getRootClassName()}>
             <PageHeader />
            {renderStep()}
        </div>
    );

}
