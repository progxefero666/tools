
import { VfaVideoMData } from "@/application/toolvfa/motor/vfavigendata";
import { VfaVideoGenHelper } from "@/application/toolvfa/motor/vfavigenhelper";
import { VfaViProcData } from "@/application/toolvfa/motor/vfaviprocdata";
import { ESMessage } from "@/common/api/esmessage";
import { Sharp } from "sharp";
import { PassThrough } from "stream";
import { VideoHelper } from "../helper/videohelp";
import { XImageBuffer } from "../model/ximagebuffer";
import { SharpGenImageBuffers } from "./sharpgenimages";


/**
 * class Sharp Gen Video Streams <PassThrough>
 *  const background:Sharp = SharpMotor.getBackground(videoData.virect);
 */
export class SharpGenViStreams {

    static async genOneImageCombStream(sendEvent: (frameInfo: ESMessage) => void,                                
                                       videoMtdata: VfaVideoMData,
                                       background: Sharp,
                                       asc: boolean, 
                                       imgbuffer: XImageBuffer): Promise<PassThrough> {
       
        let lastSentIntPart = Math.floor(videoMtdata.currvalue);
        let alphaRange: number[] = [];
        if (asc) { alphaRange = videoMtdata.alphaRangeAsc; }
        else { alphaRange = videoMtdata.alphaRangeDesc; }

        let buffers: Buffer[] = [];
        let alphaApply: number = alphaRange[0];
        for (let idx = 0; idx < videoMtdata.elemtrCf; idx++) {

            imgbuffer.alpha = alphaApply;            
            const frameBuffer: Buffer = await SharpGenImageBuffers
                .genOneXImageBufferAlphaBuffer(background,imgbuffer);
            buffers.push(frameBuffer);
            //next
            if (asc) { alphaApply += videoMtdata.alphaUnit; }
            else { alphaApply -= videoMtdata.alphaUnit; }
            // send message 
            const currentIntPart = Math.floor(videoMtdata.currvalue);
            if (currentIntPart !== lastSentIntPart) {
                const frameInfo: ESMessage = new ESMessage(
                    VfaVideoGenHelper.PROCID_CREATEINPUTS, currentIntPart.toString());
                sendEvent(frameInfo);
                lastSentIntPart = currentIntPart;
            }
            // update proc data
            videoMtdata.currvalue += videoMtdata.unit;                        
        }
        let combStream: PassThrough = VideoHelper.getCombinedStream(buffers);
        return combStream;
    }

    static async genTwoImagesCombStream(sendEvent: (frameInfo: ESMessage) => void,
                                        videoMetadata: VfaVideoMData,
                                        background: Sharp,
                                        imageA: XImageBuffer, imageB: XImageBuffer): Promise<PassThrough> {

        let lastSentIntPart = Math.floor(videoMetadata.currvalue);

        let imgA_alpha = videoMetadata.alphaRangeDesc[0];
        let imgB_alpha = videoMetadata.alphaRangeAsc[0];
        let buffers = [];               
        for (let idx = 0; idx < videoMetadata.elemtrCf; idx++) {
            imageA.alpha = imgA_alpha;
            imageB.alpha = imgB_alpha;
            const frameBuffer: Buffer = await SharpGenImageBuffers
                .genTwoXImagesBuffersAlphaBuffer(background,imageA,imageB);
            buffers.push(frameBuffer);

            //next
            imgA_alpha -= videoMetadata.alphaUnit;
            imgB_alpha += videoMetadata.alphaUnit;       
            // send message
            const currentIntPart = Math.floor(videoMetadata.currvalue);
            if (currentIntPart !== lastSentIntPart) {
                const frameInfo: ESMessage = new ESMessage(
                    VfaVideoGenHelper.PROCID_CREATEINPUTS, currentIntPart.toString());
                sendEvent(frameInfo);
                lastSentIntPart = currentIntPart;
            }                          
            videoMetadata.currvalue += videoMetadata.unit;
        }        
        let combStream: PassThrough = VideoHelper.getCombinedStream(buffers);
        return combStream;
    }    

}//end class