
import { XImage } from "@/multimedia/model/ximage";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Dimension } from "@/common/model/base/dimension";
import { VfaCtrlCanvas } from "@/application/toolvfa/vfactrcanvas";
import { InputRange, InputRangeRef } from "@/components/form/inputrange";
import { VideoPlayerBarHandle, VideoPlayerBar } from "@/components/common/videoplayerbar";
import { UIBarVideoPlayerCommands, UIVideoPlayerCommands } from "@/components/uicommands";
import { TimeUtil } from "@/common/util/timeutil";
import { VfaCvVideo } from "@/application/toolvfa/vfavideocv";
import { Timer } from "@/common/util/timer";
import { AudioPlayer } from "@/components/common/audioplayer";
import { XAudio } from "@/multimedia/model/xaudio";


export interface CmpIfCvViPlayerProps {
    cvVideoInit: VfaCvVideo;
    xaudio:XAudio;
}
export interface CmpCvViPlayerRef {
    updateCvVideo: (cvVideo: VfaCvVideo | null, newImages: XImage[] | null, newIndex: number | null) => void;
}

let audioLoaded: boolean = false;
let isPlayerInit: boolean = false;
let ctrCanvas: VfaCtrlCanvas | null = null;

const timerInterval: number = 1000;//milliseconds
//let timerInc:number = 10; //seconds
let running: boolean = false;

const CmpCvViPlayer = forwardRef<CmpCvViPlayerRef, CmpIfCvViPlayerProps>(({ cvVideoInit,xaudio }, ref) => {

    // states
    const [monitorDimension, setMonitorDimension] = useState<Dimension>(new Dimension(200, 200));
    const [checkImagesCharged, setCheckImagesCharged] = useState<boolean>(false);

    const [audioSrc, setAudioSrc] = useState<string>("/audios/sample.mp3");
    const [audioDisabled, setAudioDisabled] = useState<boolean>(true);

    // refs
    const cvContainer   = useRef<HTMLDivElement | null>(null);
    const cvPlayer      = useRef<HTMLCanvasElement | null>(null);
    const cvPlayerBar   = useRef<VideoPlayerBarHandle>(null);
    const cvPlayerRange = useRef<InputRangeRef>(null);
    const cvVideoPos    = useRef<number>(0);
    const cvVideoClock  = useRef<Timer | null>(null);
    const cvVideo       = useRef<VfaCvVideo>(cvVideoInit)

    useEffect(() => {
        
        if(!audioLoaded){
            audioLoaded = true;
            const audioUrl:string|null = xaudio.getAudioUrl();
            if(audioUrl){
                setAudioSrc(audioUrl);
                setAudioDisabled(false);  
            }                       
        }

                   
        if (!cvContainer.current || !cvPlayer.current || isPlayerInit) { return; }
        const cvdim = new Dimension(
            cvContainer.current!.clientWidth - 3,
            cvContainer.current!.clientHeight);
        setMonitorDimension(cvdim);
        ctrCanvas = new VfaCtrlCanvas
            (cvVideoInit.virect, cvPlayer.current.getContext('2d')!, cvdim);
        isPlayerInit = true;
        return () => {
            if (cvVideoClock.current && running) {
                cvVideoClock.current.stop();
            }
        }
    });

    useImperativeHandle(ref, () => ({
        updateCvVideo
    }));

    const updateCvVideo = async (cvVideoN: VfaCvVideo | null, newImages: XImage[] | null, imageIndex: number | null) => {
        if (cvVideoN != null) { cvVideo.current = cvVideoN; }
        if (newImages != null) { await ctrCanvas!.loadImages(newImages); }
        setCheckImagesCharged(hasImagesCharged)
        if (imageIndex != null) {
            cvVideoPos.current = cvVideo.current.getElemStartFrameIndex(imageIndex);
            drawCurrentFrame();
        }
    }

    const hasImagesCharged = (): boolean => {
        if (!isPlayerInit || !ctrCanvas || !ctrCanvas.cvimages) { return false; }
        if (ctrCanvas.cvimages.length > 0) { return true; }
        return false;
    }

    const onPlayerRangeChange = (name: string, result: unknown) => {
        cvVideoPos.current = Number(result);
        drawCurrentFrame();
    }

    /* main stopped render function */
    const drawCurrentFrame = () => {
        ctrCanvas!.drawVideoFrame(cvVideo.current.frames[cvVideoPos.current]);
    }

    /* main playing render function */
    const playing = () => {
        if (cvVideoPos.current < cvVideo.current.frames.length) {
            ctrCanvas!.drawVideoFrame(cvVideo.current.frames[cvVideoPos.current]);
            cvPlayerRange.current?.setValue(cvVideoPos.current);
            cvVideoPos.current += 1;
        }
        else {
            cvVideoClock.current?.stop();
            running = false;
        }
    }

    /* canvas player commands */
    const execPlayerCommand = (commandId: string) => {
        if (commandId === UIVideoPlayerCommands.PLAY.operation) {
            if (!cvVideoClock.current) {
                cvVideoClock.current = new Timer(timerInterval);
                if (!running) {
                    cvVideoPos.current = 0;
                    cvPlayerRange.current?.setValue(0);
                    cvVideoClock.current.start(playing);
                    running = true;
                }
            }
        }
        else if (commandId === UIVideoPlayerCommands.PAUSE.operation) {
            cvVideoClock.current?.stop();
            running = false;
        }
    };
    const handlePlayPause = () => {
        //console.log("Reproducción/Pausa activada");
    }
    return (
        <>
            <div ref={cvContainer} className="h-auto w-full items-center justify-center">
                    <AudioPlayer
                        src={audioSrc || "/audios/sample.mp3"}
                        disabled={audioDisabled}
                        onPlayPause={handlePlayPause} />
            </div>


            <div ref={cvContainer} className="min-h-[400px] w-full items-center justify-center">
                <canvas
                    ref={cvPlayer}
                    width={monitorDimension.width}
                    height={monitorDimension.height}
                    className="border border-black bg-black"
                />
            </div>

            <div className="h-auto border w-full flex flex-col">

                {checkImagesCharged ? (
                    <div className="h-auto mt-[8px] bg-green-250 border w-full items-center justify-center">
                        <InputRange name="playRange" 
                            ref={cvPlayerRange}
                            defaultvalue={0} step={1}
                            min={0} max={cvVideo.current.duration}
                            onchange={onPlayerRangeChange} />
                    </div>
                ) : null}

                <div className="h-auto mt-[8px] bg-green-250 border w-full flex flex-row ">

                    <div className="w-[20%] flex flex-col px-2">
                        <div className="flex gap-2">
                            <label className="whitespace-nowrap">Len(s):</label>
                            <p>{TimeUtil.formatTimeMinSec(cvVideo.current.duration)}</p>
                        </div>
                        <div className="flex gap-2">
                            <label className="whitespace-nowrap">Curr(s):</label>
                            <p>{cvVideoPos.current}</p>
                        </div>
                    </div>

                    {checkImagesCharged ? (
                        <VideoPlayerBar ref={cvPlayerBar}
                            onclick={execPlayerCommand}
                            commands={UIBarVideoPlayerCommands}
                            barclassname="w-[60%]" />
                    ) : <div className="w-[60%]"></div>}

                    <div className="w-[20%] flex flex-col px-2">
                        <div className="flex gap-2">
                            <label className="whitespace-nowrap">Len(f):</label><p>{cvVideo.current.getCountFrames()}</p>
                        </div>
                        <div className="flex gap-2">
                            <label className="whitespace-nowrap">Res:</label><p>{cvVideo.current.resolution}</p>
                        </div>
                    </div>
                </div>

            </div>

        </>
    );
});
export default CmpCvViPlayer;

/*
    const outputFrame = (frameIndex: number) => {
        const viFrame: VfaVideoFrame = cvVideoRef.current.frames[frameIndex];        
        cu.sep();
        cu.c("frameIndex:",frameIndex);
        const imgIndexA = viFrame.imgframes[0].objIndex;
        cu.c("image index A",imgIndexA);
        if(viFrame.imgframes.length>1){
            const imgIndexB = viFrame.imgframes[1].objIndex;
            cu.c("image index A",imgIndexB);
        }
    }
*/