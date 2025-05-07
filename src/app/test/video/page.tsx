"use client";

import { useEffect, useRef, useState } from "react";
import { AppUI, useClientReady } from "@/style/appui";
import { Dimension } from "@/common/model/base/dimension";

// view:css
import "@/css/allwidths.css";


import 'video.js/dist/video-js.css';
import { MMBase } from "@/multimedia/objtypes";
import { VideoPlayer, VideoPlayerRefIf } from "@/components/common/videoplayer";
import { XHtmlComponent } from "@/components/form/htmlcomp";
import { HtmlCompTypes } from "@/common/html/html";
import { VideoHelper } from "@/multimedia/helper/videohelp";
import { XVideo } from "@/multimedia/model/xvideo";

let monitorDimension: Dimension = new Dimension(150,150);

export default function PageVideoPlayer() {

    const [isVideoContReady, setIsVideoContReady] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const viPlayerRef = useRef<VideoPlayerRefIf>(null);

    const [videoSrc, setVideoSrc] = useState<string | ArrayBuffer>("https://www.w3schools.com/html/mov_bbb.mp4");

    /*
    HtmlCompTypes.FILE
    */
    useEffect(() => {
        if(!containerRef.current || isVideoContReady) { return; }       
        monitorDimension = new Dimension(
            containerRef.current!.clientWidth - 3,
            containerRef.current!.clientHeight);      
        setIsVideoContReady(true);             
    });

    async function onChangeField(name: string, result: unknown) {
        alert("video received");
        if (name == "videofile") {
            const xvideo:XVideo|null = await VideoHelper.processXVideo(result as File);
            alert("video processed");
            //dataXAudio= await .processXVido(result as File);
        }
    };

    const clientReady = useClientReady();
    if (!clientReady) { return <div>Loading...</div>; }
      
    return (
        <div id="cont_root" className={AppUI.getRootClassName()}>

            <div className="w-full min-h-[566px] max-h-[566px] grid grid-cols-[30%_1%_69%]  ">

                {/* left colum ................................................................... */}
                <div className="min-h-[566px] max-h-[566px] flex flex-col border bg-black ">
                <XHtmlComponent name="videofile"
                        classname="w-full"
                        type={HtmlCompTypes.FILE}
                        label="Audio File"
                        defaultvalue={AppUI.videoInputformats}
                        multiple={false}
                        onchange={onChangeField} />                    
                </div>
                <div></div>

                {/* right colum  */}
                <div className="w-full min-h-[520px] max-h-[570px] ">
                    <div ref={containerRef} className="min-h-[507px] w-full items-center justify-center">
                        {isVideoContReady ?
                        <VideoPlayer ref={viPlayerRef}
                                         dimension={monitorDimension} 
                                         mimetype={MMBase.MIMETYPE_VIDEO_MP4}
                                         src="https://www.w3schools.com/html/mov_bbb.mp4" />
                        :null}                 
                    </div>

                    <div className="h-auto mt-[8px] bg-green-250 border w-full items-center justify-center">
                    </div>
                </div>

            </div>

        </div>
    );

}//end function