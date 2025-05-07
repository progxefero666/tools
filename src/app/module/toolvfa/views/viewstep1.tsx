"use client";

import React, { useEffect, useState } from "react";
import { useRef } from "react"

import { AppUI, useClientReady } from "@/style/appui";
import { CmOperation } from "@/application/appcommon";
import { AudioPlayer } from "@/components/common/audioplayer";
import { HtmlForm } from "@/common/html/htmlform";
import { XHtmlComponent } from "@/components/form/htmlcomp";
import { InputDimension, InputDimensionRef } from "@/components/form/inputdimension";
import { MMDimProfiles } from "@/multimedia/profiles";
import { InputNumber } from "@/components/form/inputnumber";
import { TechBase } from "@/common/tech/tech";

import { FrontData, FrontProcess } from "@/application/toolvfa/vfactrbase";
import { VfaVideo } from "@/application/toolvfa/vfavideo";
import { XAudio } from "@/multimedia/model/xaudio";
import { AudioHelper } from "@/multimedia/helper/audiohelp";
import { ColorHelper } from "@/common/graphics/color/colorhelper";
import { DeviceUtil } from "@/common/util/devicehelper";
import { cu } from "@/common/util/consolehelper";
import { showUiPopupViewJson } from "@/components/modal/puviewjson";
import { ButtonsColors, ThemeColors } from "@/style/apptheme";
import { XButtonIcon } from "@/components/buttons/iconbutton";

import "@icon/themify-icons/themify-icons.css";

let dataXAudio:XAudio | null = null;
export interface ToolVfaIfcStep1 {
    process: (vfaVideo: VfaVideo) => void;
    formBase: HtmlForm;
}
export default function ToolVfaPageStep1({ process,  formBase }: ToolVfaIfcStep1) {
    const [audioSrc, setAudioSrc] = useState<string>("");
    const [audioDisabled, setAudioDisabled] = useState<boolean>(true);
    const [applyTrans, setApplyTrans] = useState<boolean>(true);

    const dimRef = useRef<InputDimensionRef>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const transVelRef = useRef<HTMLInputElement>(null);
    const applyTransRef = useRef<HTMLInputElement>(null);
    const ouputFormatRef = useRef<HTMLSelectElement>(null);
    const frameRef = useRef<HTMLInputElement>(null);
    const colorRef = useRef<HTMLDivElement>(null);

    async function onChangeField(name: string, result: unknown) {
        if (name == "applytrans") {
            setApplyTrans(result as boolean);
        }
        if (name == "audiofile") {
            dataXAudio= await FrontProcess.processXAudio(result as File);
            if (dataXAudio) {
                const audioUrl = dataXAudio.getAudioUrl();
                setAudioSrc(audioUrl!);
                setAudioDisabled(false);
            }                
        }
    };

    const checkData = (): boolean => {
        if (nameRef.current?.value.length == 0) {
            alert("video name required");
            return false;
        }
        if (dimRef.current!.getDimension().width == 0) {
            alert("incorrect dimension width");
            return false;
        }
        if (dimRef.current!.getDimension().height == 0) {
            alert("incorrect dimension height");
            return false;
        }
        return true;
    }

    const handlePlayPause = () => {
        //console.log("Reproducción/Pausa activada");
    }

    const next = () => {
        if (!checkData()) { return; }
        let transvelocity = 0;
        if (applyTransRef.current!.checked) {
            transvelocity = Number(transVelRef.current?.value) || 0;
        }
        const rgbaColor = ColorHelper.getHtmlElemRgbaColor(colorRef.current!.style.backgroundColor);
        const vfaVideo: VfaVideo = new VfaVideo(dataXAudio!,
            nameRef.current!.value, ouputFormatRef.current!.value,
            dimRef.current!.getDimension(),rgbaColor, 
            applyTransRef.current!.checked,transvelocity);

        process(vfaVideo);
    };//end next

    useEffect(() => {
        if (nameRef.current) {
            nameRef.current!.focus();
        }
    });

    const clientReady = useClientReady();
    if (!clientReady) { return <div>Loading...</div>; }

  
    const getMainContClassName = (): string => {
        const deviceSize: string = DeviceUtil.detectSize();
        if (deviceSize == TechBase.SIZE_SM || deviceSize == TechBase.SIZE_MD) {
            return "flex flex-col border px-2 pb-4";
        }
        return "grid grid-cols-2 gap-4 border px-2 pb-4";
    }

    return (
        <>
            <div className="w-full h-auto flex grow">
              
            </div>
            <div className={getMainContClassName()}>

                <div className="w-full flex grow">
                    <XHtmlComponent name="name"
                        classname="w-[67%] mr-[3%]"
                        ref={nameRef}
                        type={formBase.getHtmlCompType("name")}
                        label={formBase.getLabel("name")}
                        defaultvalue={formBase.getDefaultValueText("name")} />

                    <XHtmlComponent name="format"
                        classname="w-[30%]"
                        ref={ouputFormatRef}
                        type={formBase.getHtmlCompType("format")}
                        label={formBase.getLabel("format")}
                        defaultvalue={formBase.getDefaultValueText("format")}
                        collection={formBase.getCollection("format")} />
                </div>

                <div className="flex grow">
                    <InputDimension
                        classname="w-full"
                        ref={dimRef}
                        name="dimension"
                        label="Dimension"
                        defaultvalue={MMDimProfiles.ALL_KEYS[0]}
                        collection={MMDimProfiles.ALL_KEYS}
                        type="number" />
                </div>

                <div className="w-full flex grow">

                    <div className="w-[25%] mr-[3%]">
                        <InputNumber 
                            ref={frameRef} 
                            classname="w-full"
                            name="framerate"
                            label={formBase.getLabel("framerate")}
                            defaultvalue={formBase.getDefaultValueNumber("framerate")}
                            minvalue={25} maxvalue={60} />

                    </div>

                    <div className="w-[72%]">
                        <XHtmlComponent 
                            ref={colorRef}
                            name="backcolor"
                            classname="w-full"                            
                            type={formBase.getHtmlCompType("backcolor")}
                            label={formBase.getLabel("backcolor")}
                            defaultvalue={formBase.getDefaultValueText("backcolor")} />
                    </div>

                </div>

                <div className="w-full flex flex-col">
                    <label className="w-full mb-2">Image Transitions</label>
                    <div className="w-full flex grow">
                        <XHtmlComponent
                            ref={applyTransRef}
                            name="applytrans"
                            classname="w-[38%]"                            
                            type={formBase.getHtmlCompType("applytrans")}
                            label={formBase.getLabel("applytrans")}
                            defaultvalue={formBase.getDefaultValueBoolean("applytrans")}
                            onchange={onChangeField} />

                        {applyTrans ? (
                            <XHtmlComponent 
                                ref={transVelRef}
                                name="transvelocity"
                                classname="w-[62%]"                                
                                type={formBase.getHtmlCompType("transvelocity")}
                                defaultvalue={formBase.getDefaultValueNumber("transvelocity")}
                                min={1}
                                max={10} />
                        ) : <div></div>}
                    </div>
                </div>

                <XHtmlComponent name="audiofile"
                    classname="w-full"
                    type={formBase.getHtmlCompType("audiofile")}
                    label={formBase.getLabel("audiofile")}
                    defaultvalue={AppUI.audioInputFormats}
                    multiple={false}
                    onchange={onChangeField} />

                <div>
                    <label>play audio</label>
                    <AudioPlayer
                        src={audioSrc || "/audios/sample.mp3"}
                        disabled={audioDisabled}
                        onPlayPause={handlePlayPause} />
                </div>

            </div>

            <div className="w-full flex justify-center mt-3">
                <button
                    className="btn btn-accent"
                    onClick={next} >
                    {CmOperation.OPID_NEXT}
                </button>
            </div>

        </>

    );

}
