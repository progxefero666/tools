"use server";

import sharp, { OverlayOptions,type Sharp } from "sharp";

import { NextResponse } from "next/server";
import { AppConstants } from "@/common/app/constants";
import { PassThrough } from "stream";
import { AppConfig } from "@/application/appconfig";
import { ESMessage } from "@/common/api/esmessage";
import { AppApi } from "@/application/appapi";
import { VfaVideo } from "@/application/toolvfa/vfavideo";
import { VfaViProcData } from "../../../../application/toolvfa/motor/vfaviprocdata";
import { VfaVideoGenHelper } from "../../../../application/toolvfa/motor/vfavigenhelper";
import { VfaStorage } from "../../../../application/toolvfa/server/vfastorage";

import { XImageBuffer } from "@/multimedia/model/ximagebuffer";
import { SharpMotor } from "@/multimedia/sharp/sharpmotor";
import { SharpGenViStreams } from "@/multimedia/sharp/sharpgenbuffers";
import { VfaVideoGenFile } from "../../../../application/toolvfa/motor/vfavigenfile";

import { createVideoFromListVideoFiles } from "@/multimedia/ffmpeg/ffmpegcreator";
import { ServerPaths } from "../../../../application/toolvfa/server/vfaserverpaths";
import path from "path";
import { VideoConstants } from "@/multimedia/videoconst";
import { VfaVideoMData } from "../../../../application/toolvfa/motor/vfavigendata";

/**
 * @param request with "userId"
 *  for EventSource
 *      path--> /app/api/toolvfa/videogenerator
 *      send client messages: model --> FrameInfo 
 * XImageBuffer
 * 
 */
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = Number(searchParams.get(AppConfig.KEY_USERID));
      
    const videoData: VfaVideo = await VfaStorage.readDoc(userId);
    const videoMetadata:VfaVideoMData = VfaVideoGenHelper
        .getVideoGenMtData(userId,VfaVideoGenHelper.PROC_PROGRESS_LEN, videoData);
    
    videoData.setMetadata(videoMetadata);  

    const stream = new ReadableStream({
        async start(controller) {
            // GET Process:start ..............................................................................

            const sendError = (error:any) => {//console.log("error");
                const errMsg = error instanceof Error?
                                     error.message:VfaVideoGenHelper.ERROR_UNKNOW;
                sendEvent(new ESMessage(AppConstants.UNDEFINED,
                            videoData.mtdata.currvalue.toString(),errMsg));
            }
            const sendEvent = (frameInfo: ESMessage) => {//console.log(frameInfo.getJsonString());
                controller.enqueue(AppApi.getEncodeMessage(frameInfo.getJsonString()));
            }

            // common: for all elements
            const background:Sharp = SharpMotor.getBackground(videoData.xvideo.virect);
            const trBuffers:XImageBuffer[] = await VfaVideoGenHelper
                .getXImagesTrBuffers(userId,videoData.elements);
            const nrBuffers:XImageBuffer[] = await VfaVideoGenHelper
                .getXImagesNrBuffers(userId,videoData.elements);                
        
            //let genProcData = new VfaViProcData(userId,videoData.mtdata.unit,0);

            // first element: transition asc
            let combStream: PassThrough = await SharpGenViStreams.genOneImageCombStream(sendEvent,
                videoData.mtdata,background,true, trBuffers[0]);

            let result = await VfaVideoGenFile.createProcVideo
                (videoData.xvideo,videoData.mtdata.getNextViFilePath(),combStream);            
            if(!result){
                sendError(VfaVideoGenHelper.ERROR_UNKNOW);
                controller.close();return;
            } 
            
            for (let elemIndex = 0; elemIndex < videoData.elements.length; elemIndex++) {
                
                // current element: not trans                
                const currImgbuffer = XImageBuffer.getCloned(nrBuffers[elemIndex]);
                let combStream: PassThrough = await VfaVideoGenHelper
                    .getXImageCombStream(userId,currImgbuffer,videoData.mtdata.elemNrCf)
                result = await VfaVideoGenFile.createProcVideo
                    (videoData.xvideo,videoData.mtdata.getNextViFilePath(),combStream);                      
                if(!result) {
                    sendError(VfaVideoGenHelper.ERROR_UNKNOW);
                    controller.close();return;
                } 
                
                // current && next element:  transition                     
                if (elemIndex < (videoData.elements.length - 1)) {             
                    let combStream: PassThrough = await SharpGenViStreams
                        .genTwoImagesCombStream(sendEvent,videoData.mtdata,
                                                background,trBuffers[elemIndex],trBuffers[elemIndex+1]);
                    result = await VfaVideoGenFile.createProcVideo
                        (videoData.xvideo,videoData.mtdata.getNextViFilePath(),combStream);                  
                    if(!result) {
                        sendError(VfaVideoGenHelper.ERROR_UNKNOW);
                        controller.close();return;                        
                    }                 
                }
                
            }//end for
            
            // last image:transElemCountFrames -->curr alpha desc           
            const elemIndex = (videoData.elements.length - 1);
            let lastcombStream: PassThrough = await SharpGenViStreams.genOneImageCombStream
                (sendEvent,videoData.mtdata,background,true, trBuffers[elemIndex]);           
            result = await VfaVideoGenFile.createProcVideo(videoData.xvideo,videoData.mtdata.getNextViFilePath(),lastcombStream);                 
            if(!result) {
                sendError(VfaVideoGenHelper.ERROR_UNKNOW);
                controller.close();return;                        
            }
            
            // generate final video: concat all videos order by index
            
            const videoFoder:string = ServerPaths.getToolVfaVideoFolder(userId);
            const videoConcatFilePath = path.join(videoFoder,videoData.xvideo.fname); 
            
            //const audioFolder = ServerPaths.getToolAudiosPath(userId);
            //const audioFilePath: string = path.join(audioFolder, videoData.audio.fname);
            const onCreateFinalVideoProgress = (percent100: number) => {
                console.log(percent100.toString());
                const frameInfo: ESMessage 
                    = new ESMessage(VfaVideoGenHelper.PROCID_SAVEVIDEO,percent100.toString());
                sendEvent(frameInfo);
            }
            console.log("create final video");                      
            result = await createVideoFromListVideoFiles(onCreateFinalVideoProgress,
                VideoConstants.CODEC_H264_AVC,VideoConstants.BITRATE_2500,
                videoData.xvideo.framerate,videoData.xvideo.resolution,
                videoData.mtdata.viListPaths,videoConcatFilePath);     
            
            // GET Process:end .............................................................................................
        }
    });
    return new NextResponse(stream, { headers: AppApi.DEF_HEADERS });

} //end GET





