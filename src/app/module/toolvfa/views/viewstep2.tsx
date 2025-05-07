"use client";

import { VfaVideo } from "@/application/toolvfa/vfavideo";
import { cu } from "@/common/util/consolehelper";
import { XImage } from "@/multimedia/model/ximage";
import { useEffect, useRef, useState } from "react";
import CmpControlImages from "../comp/cmpctrimages";
import CmpCvViPlayer, { CmpCvViPlayerRef } from "../comp/cmpcviplayer";
import { VfaVideoMData } from "@/application/toolvfa/motor/vfavigendata";
import { FrontProcess } from "@/application/toolvfa/vfactrbase";
import { AppStorageService } from "@/common/storage/appstrclient";
import { VfaCvVideo } from "@/application/toolvfa/vfavideocv";
import { XButtonIcon } from "@/components/buttons/iconbutton";
import { ButtonsColors, ThemeColors } from "@/style/apptheme";
import { showUiPopupViewJson } from "@/components/modal/puviewjson";
import { AppService } from "@/application/service/appservices";

import "@icon/themify-icons/themify-icons.css";
import { AudioPlayer } from "@/components/common/audioplayer";
import { AppLang } from "@/application/language/applang";

const userId = AppStorageService.readUserId();
let viMetadata:VfaVideoMData;

let cvVideo:VfaCvVideo;
export interface ToolVfaIfStep2 {
    tvideo: VfaVideo;
    process: (elements: Array<XImage>) => void;
}
export default function ToolVfaPageStep2({ tvideo, process }: ToolVfaIfStep2) {
    const playerRef = useRef<CmpCvViPlayerRef>(null);


    const cntElemsRange:number[] = [VfaVideo.COUNT_ELEMS_MIN,tvideo.countElementsMax];
    if(cvVideo==null){cvVideo = FrontProcess.getCvVideo(tvideo);}
    
    const updateImages = (elements: XImage[],rowindex:number) => { 
        cvVideo.updateCvVideo(elements.length);        
        playerRef.current!.updateCvVideo(cvVideo,elements,rowindex);
    }

    const selectImage = (rowindex:number)=> { 
        playerRef.current!.updateCvVideo(null,null,rowindex);
    }

    const processImages = (elements: XImage[]) => {
        cu.cs("execute processCollImages");
    }

    const executeActionBar = async (operation: string) => {
        
        if(operation=="viewVideoJson"){
            showUiPopupViewJson(tvideo.getJsonString()).then(() => {}); 
        }
        else if(operation=="download_audio"){
            //const audioUrl = await AppService.readFileAudio(userId,tvideo.audio.fname);
        } 
        else if(operation=="generate"){
            //const fname:string = "";
            //AppLang.LNG_CODE_ES
            /**
             * class TtsLocalService.genTextToAudioMP3(userId:number,fname:string,
                                             language:string,voiceName:string,text: string)
            */
        }

    }


    return (
            <div className="w-full h-auto grid grid-cols-[30%_1%_69%]">

                <div className="h-auto flex flex-col ">

                    <div className="w-full h-auto flex mb-2 px-[6px] py-2 space-x-2 bg-white border">
                        <XButtonIcon 
                            callback={executeActionBar} operation="viewVideoJson"
                            iconname="video-clapper"
                            btncolor={ButtonsColors.PRIMARY_CONTENT}
                            iconsize={"md"}
                            iconcolor={ThemeColors.PRIMARY} />

                        <XButtonIcon 
                            callback={executeActionBar} operation="download_audio"
                            iconname="pulse"
                            btncolor={ButtonsColors.PRIMARY_CONTENT}
                            iconsize={"md"}
                            iconcolor={ThemeColors.PRIMARY} />               
                    </div>    

                    <CmpControlImages cntimages={cntElemsRange} 
                                    virectcolor={tvideo.xvideo.virect}
                                    selectImage={selectImage}
                                    updateImages={updateImages} 
                                    processImages={processImages} />
                </div>
                <div></div>
                <div className="h-auto flex flex-col ">
                    <CmpCvViPlayer ref={playerRef} cvVideoInit={cvVideo} xaudio={tvideo.audio}/>
                </div>
            </div>
       
    );

}//end function

