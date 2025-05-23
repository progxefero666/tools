"use client";

import { useEffect, useRef, useState, ChangeEvent } from "react";
import { AppUI, useClientReady } from "@/style/appui";
import { Dimension } from "@/common/model/base/dimension";
import { VideoPlayerBar } from "@/components/common/videoplayerbar";
import { UIBarVideoPlayerCommands } from "@/components/uicommands";
import { GColors } from "@/common/graphics/color/colorlib";
import { XButtonIcon } from "@/components/buttons/iconbutton";
import { AudioCanvas } from "./audiocanvas";
import { AppService } from "@/application/service/appservices";
import { AudioPlayer } from "@/components/common/audioplayer";
import { AppAudioApiService } from "@/application/service/appservaudio";

// view:css
import WaveSurfer from "wavesurfer.js";
import "@/css/allwidths.css";
import "@icon/themify-icons/themify-icons.css";

let ctrCanvas: AudioCanvas | null = null;

/**
 * Vier Page Audio Api player
 * @returns 
 */
export default function Page() {

    // audio canvas
    const [canvasDimension, setCanvasDimension] = useState<Dimension>(new Dimension(200, 200));
    const [isCanvasInitialized, setIsCanvasInitialized] = useState(false);
    const canvasContRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const getCvContDimension = ():Dimension => {
        return new Dimension(
            canvasContRef.current!.clientWidth - 3,
            canvasContRef.current!.clientHeight);
    }

    const waveSurferContRef = useRef<HTMLDivElement>(null);

    // audio url
    const [audioSrc, setAudioSrc] = useState<string>("/audios/sample.mp3");

    const loadUrlAudio = async () => {
        const audioUrl = await AppService.readAppFileAudio("audiotwomin.mp3");
        if(!audioUrl){return;}
        setAudioSrc(audioUrl);        
        /*
        waveSurferRef.current = WaveSurfer.create({
            container: waveSurferContRef.current,
            waveColor: "#ccc",
            progressColor: "#4caf50",
            barWidth: 2,
            normalize: true,
            height: 30
        });
        waveSurferRef.current.load(src);        
        <div ref={containerRef} className="w-full" />      
        */
    }

    const loadWaveAudio = async () => {
        const audioWave:Float32Array| null 
            = await AppAudioApiService.readStereoAudioWave("audiotwomin.mp3");   
            alert("loadWaveAudio end");
    }    

    useEffect(() => {
       
        if ( ctrCanvas != null || 
            !canvasContRef.current||
            !canvasContRef.current.clientWidth) { return; }
        if (!isCanvasInitialized) {
            const canvasContDimension = getCvContDimension();
            setCanvasDimension(canvasContDimension);
            setIsCanvasInitialized(true);
        }
        else {            
            if (canvasRef.current && canvasRef.current.getContext('2d')) {
                ctrCanvas = new AudioCanvas(canvasRef.current, canvasDimension, GColors.BLACK);
                loadUrlAudio();
                loadWaveAudio();
            }
        }
    });

    // view menu control
    const execPlayerCommand = async (commandId: string) => {
    

    }

    const onAudioPlayerPP = () => {
        //console.log("Reproducción/Pausa activada");
    }

    const clientReady = useClientReady();
    if (!clientReady) { return <div>Loading...</div>; }

    const getRootClassName = () => {
        //const device = window.screen;
        const device = AppUI.getBrowserDimension();
        return AppUI.getRootContainerWidthClass(device.width);
    }

    return (
        <div id="cont_root" className={getRootClassName()}>

            <div className="w-full h-auto grid grid-cols-[19%_1%_80%]  ">

                {/* left colum ................................................................... */}
                <div className="min-h-[566px] max-h-[566px] flex flex-col  ">

                    <div className="w-full h-auto flex mb-2 px-[6px] py-2 space-x-2 bg-white border">
                         <p>bar</p>      
                    </div>

                    <div className="w-full h-auto flex mb-2 px-[6px] py-2 space-x-2 bg-white border">
                        <p>contain</p>  
                    </div>
                </div>

                <div>
                </div>

                {/* right colum ................................................................... */}
                <div className="w-full h-auto flex flex-col ">

                    <div className="w-full h-auto border bg-white mb-2 px-[6px] py-2">
                        <AudioPlayer src={audioSrc}                    
                                     onPlayPause={onAudioPlayerPP} />
                    </div>

                    <div className="min-h-[160px] w-full items-center justify-center"
                        ref={canvasContRef}>
                        <canvas
                            ref={canvasRef}
                            width={canvasDimension.width}
                            height={canvasDimension.height}
                            className="border border-black bg-black" />
                    </div>

                    <div className="min-h-[160px] w-full items-center justify-center">
                        <p>wave audio</p>
                    </div>

                    <div className="h-auto mt-[8px] bg-green-250 border w-full items-center justify-center">
                        <VideoPlayerBar
                            barclassname="w-full"
                            onclick={execPlayerCommand}
                            commands={UIBarVideoPlayerCommands} />
                    </div>

                </div>

            </div>

        </div>
    );

}//end function

