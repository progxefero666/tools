"use server";

import sharp, { OverlayOptions, type Sharp } from "sharp";

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

import { createVideoAudioFromListVideoFiles, createVideoFromListVideoFiles } from "@/multimedia/ffmpeg/ffmpegcreator";
import { ServerPaths } from "../../../../application/toolvfa/server/vfaserverpaths";
import path from "path";
import { VideoConstants } from "@/multimedia/videoconst";
import { VfaVideoMData } from "../../../../application/toolvfa/motor/vfavigendata";
import { concat } from "audio-buffer-utils";
import { getVideoMetadata } from "@/multimedia/ffprobe/ffprobevideo";

/*

    //const videoData: VfaVideo = await VfaStorage.readDoc(userId);
    //videoData.mtdata = VfaVideoGenHelper.getVideoGenMtData
    //    (userId, VfaVideoGenHelper.PROC_PROGRESS_LEN, videoData);
videoData.mtdata.userId = userId;
*/


export async function getVideoGenMtData(userId: number): Promise<VfaVideo> {

    const vidata: VfaVideo = await VfaStorage.readDoc(userId);

    const totalFrames = vidata.audio.duration * vidata.xvideo.framerate;
    const transTotalDuration = vidata.elements.length * vidata.transvelocity;
    const transElemCountFrames = vidata.transvelocity * vidata.xvideo.framerate;
    const normalTotalDuration = vidata.audio.duration - transTotalDuration;
    const normalTotalFrames = normalTotalDuration * vidata.xvideo.framerate;

    const normalElemCountFrames = Math.floor(normalTotalFrames / vidata.elements.length);
    const alphaUnit = (1.0 / transElemCountFrames);

    const countElemVideos: number = vidata.elements.length * 2;
    const percUnit = (VfaVideoGenHelper.PROC_PROGRESS_LEN / countElemVideos);

    const metadata = new VfaVideoMData(
        vidata.xvideo.framerate, totalFrames,
        transElemCountFrames, normalElemCountFrames,
        percUnit, alphaUnit);
    metadata.userId = userId;
    vidata.mtdata = metadata;

    return vidata;
}

/**
 * @param request with "userId"
 *  for EventSource
 *      path--> /app/api/toolvfa/videogenerator
 *      send client messages: model --> FrameInfo 
 */

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = Number(searchParams.get(AppConfig.KEY_USERID));

    const videoData: VfaVideo = await getVideoGenMtData(userId);

    const stream = new ReadableStream({

        async start(controller) {
            // GET Process:start ..............................................................................

            // process client comunications
            const sendError = (error: any) => {//console.log("error");
                const errMsg = error instanceof Error ?
                    error.message : VfaVideoGenHelper.ERROR_UNKNOW;
                sendEvent(new ESMessage(AppConstants.UNDEFINED,
                    videoData.mtdata.currvalue.toString(), errMsg));
            }
            const sendEvent = (frameInfo: ESMessage) => {//console.log(frameInfo.getJsonString());
                controller.enqueue(AppApi.getEncodeMessage(frameInfo.getJsonString()));
            }
            const updateProgress = (processId:string) => {
                videoData.mtdata.currvalue += videoData.mtdata.unit;
                const msgValue: string = (Math.floor(videoData.mtdata.currvalue)).toString();
                sendEvent(new ESMessage(processId, msgValue));
                //console.log(msgValue.concat("%"));
            }//VfaVideoGenHelper.PROCID_CREATEINPUTS

            // common background
            const background: Sharp = SharpMotor.getBackground(videoData.xvideo.virect);

            // read all elements data buffers
            const trBuffers: XImageBuffer[] = await VfaVideoGenHelper
                .getXImagesTrBuffers(userId, videoData.elements);

            const nrBuffers: XImageBuffer[] = await VfaVideoGenHelper
                .getXImagesNrBuffers(userId, videoData.elements);

            // init generation elements videos    
            let result: boolean = true;
            for (let elemIndex = 0; elemIndex < videoData.elements.length; elemIndex++) {

                if (elemIndex == 0) {
                    const currImgbuffer = XImageBuffer.getCloned(nrBuffers[elemIndex]);
                    let combStream: PassThrough = await VfaVideoGenHelper
                        .getXImageCombStream(userId, currImgbuffer, videoData.mtdata.elemtrCf)
                    result = await VfaVideoGenFile.createProcVideo
                        (videoData.xvideo, videoData.mtdata.getNextViFilePath(), combStream);
                }
                else {
                    //imgA:elemIndex-1 down 
                    //imgB:elemIndex up
                    let combStream: PassThrough = await SharpGenViStreams.genTwoImagesCombStream
                        (videoData.mtdata, background, trBuffers[elemIndex - 1], trBuffers[elemIndex]);

                    result = await VfaVideoGenFile.createProcVideo
                        (videoData.xvideo, videoData.mtdata.getNextViFilePath(), combStream);
                    if (!result) {
                        sendError(VfaVideoGenHelper.ERROR_UNKNOW);
                        controller.close(); return;
                    }
                }
                updateProgress(VfaVideoGenHelper.PROCID_CREATEINPUTS);

                // current element: not trans                          
                const currImgbuffer = XImageBuffer.getCloned(nrBuffers[elemIndex]);
                let combStream: PassThrough = await VfaVideoGenHelper
                    .getXImageCombStream(userId, currImgbuffer, videoData.mtdata.elemNrCf)
                result = await VfaVideoGenFile.createProcVideo
                    (videoData.xvideo, videoData.mtdata.getNextViFilePath(), combStream);
                if (!result) {
                    sendError(VfaVideoGenHelper.ERROR_UNKNOW);
                    controller.close(); return;
                }
                updateProgress(VfaVideoGenHelper.PROCID_CREATEINPUTS);
            }//end for

            videoData.mtdata.currvalue = 100;
            updateProgress(VfaVideoGenHelper.PROCGEN_END);

            // generate final video: concat all videos order by index    
            //console.log("create final video");
            const videoFoder: string = ServerPaths.getToolVfaVideoFolder(userId);
            const videoFilePath = path.join(videoFoder, videoData.xvideo.fname);
            const audioFolder = ServerPaths.getToolAudiosPath(userId);
            const audioFilePath: string = path.join(audioFolder, videoData.audio.fname);

            const onCreateFinalVideoProgress = (percent: number) => {
                videoData.mtdata.currvalue = percent;
                updateProgress(VfaVideoGenHelper.PROCID_SAVEVIDEO);
            }

            videoData.mtdata.unit = 1;
            videoData.mtdata.currvalue = 0;
            result = await createVideoAudioFromListVideoFiles(
                onCreateFinalVideoProgress,audioFilePath,
                videoData.xvideo.duration,
                VideoConstants.CODEC_H264_AVC, VideoConstants.BITRATE_2500,
                videoData.xvideo.framerate, videoData.xvideo.resolution,
                videoData.mtdata.viListPaths, videoFilePath);
            if (result) {
                //console.log("create final video end - success");   
                //console.log("store path:".concat(videoConcatFilePath)); 
            }
            videoData.mtdata.currvalue = 100;
            //const metadata:unknown =
            //await getVideoMetadata(videoFilePath);
            updateProgress(VfaVideoGenHelper.PROCGEN_END);
            // GET Process:end .............................................................................................
        }
    });
    return new NextResponse(stream, { headers: AppApi.DEF_HEADERS });

} //end GET





