"use client";

import { VfaVideo } from "@/application/toolvfa/vfavideo";
import { XImage } from "@/multimedia/model/ximage";
import { useRef } from "react";

import { FrontProcess } from "@/application/toolvfa/vfactrbase";
import { VfaCvVideo } from "@/application/toolvfa/vfavideocv";
import { XButtonIcon } from "@/components/buttons/iconbutton";
import { ButtonsColors, ThemeColors } from "@/style/apptheme";
import { showUiPopupViewJson } from "@/components/modal/puviewjson";
import CmpControlImages from "../comp/cmpctrimages";
import CmpCvViPlayer, { CmpCvViPlayerRef } from "../comp/cmpcviplayer";

//page css
import "@icon/themify-icons/themify-icons.css";
import { AppThemifyIcons } from "@/style/appthicons";
import { AppService } from "@/application/service/appservices";

export interface ToolVfaIfStep2 {
    userId: number;
    tvideo: VfaVideo;
    process: (elements: Array<XImage>) => void;
}
export default function ToolVfaPageStep2({ userId, tvideo, process }: ToolVfaIfStep2) {
    const playerRef = useRef<CmpCvViPlayerRef>(null);
    const cvVideoRef = useRef<VfaCvVideo>(FrontProcess.getCvVideo(tvideo));
        
    const updateImages = (elements: XImage[],rowindex:number) => { 
        cvVideoRef.current.updateCvVideo(elements.length);  
        playerRef.current!.updateCvVideo(cvVideoRef.current,elements,rowindex);
    }

    const selectImage = (rowindex:number)=> { 
        playerRef.current!.updateCvVideo(null,null,rowindex);
    }

    const next = (elements: XImage[]) => {        
        process(elements);
    }

    const executeActionBar = async (operation: string) => {        
        if(operation=="viewVideoJson"){
            showUiPopupViewJson(tvideo.getJsonString()).then(() => {}); 
        }
        else if(operation=="download_audio"){
            const audioUrl = await AppService.readUserFileAudio(userId,tvideo.audio.fname);
        } 
    }

    return (
        <>
            <div className="w-full h-auto grid grid-cols-[30%_1%_69%]">

                <div className="h-auto flex flex-col ">

                    <div className="w-full h-auto flex mb-2 px-[6px] py-2 space-x-2 bg-white border">
                        <XButtonIcon 
                            callback={executeActionBar} operation="viewVideoJson"
                            iconname={AppThemifyIcons.TI_VIDEOCLAPPER}
                            btncolor={ButtonsColors.PRIMARY_CONTENT}
                            iconsize={"md"}
                            iconcolor={ThemeColors.PRIMARY} />

                        <XButtonIcon 
                            callback={executeActionBar} operation="download_audio"
                            iconname={AppThemifyIcons.TI_PULSE}
                            btncolor={ButtonsColors.PRIMARY_CONTENT}
                            iconsize={"md"}
                            iconcolor={ThemeColors.PRIMARY} />               
                    </div>    

                    <CmpControlImages cntimages={cvVideoRef.current.countElementsRange} 
                                    virectcolor={tvideo.xvideo.virect}
                                    selectImage={selectImage}
                                    updateImages={updateImages} 
                                    processImages={next} />
                </div>
                <div></div>
                <div className="h-auto flex flex-col ">
                    <CmpCvViPlayer ref={playerRef} cvVideoInit={cvVideoRef.current} xaudio={tvideo.audio}/>
                </div>
            </div>

        </>           
    );

}//end function

