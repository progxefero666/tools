

import { Sharp } from "sharp";
import { VfaVideoMData } from "@/application/toolvfa/motor/vfavigendata";
import { PassThrough } from "stream";
import { VideoHelper } from "../helper/videohelp";
import { XImageBuffer } from "../model/ximagebuffer";
import { SharpGenImageBuffers } from "./sharpgenimages";


/**
 * class SharpGenViStream
 */
export class SharpGenViStreams {

    static async genOneImageCombStream(videoMtdata: VfaVideoMData,
                                       background: Sharp,
                                       asc: boolean, 
                                       imgbuffer: XImageBuffer): Promise<PassThrough> {
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
        }
        let combStream: PassThrough = VideoHelper.getCombinedStream(buffers);
        return combStream;
    }

    static async genTwoImagesCombStream(videoMetadata: VfaVideoMData,background: Sharp,
                                        imageA: XImageBuffer, imageB: XImageBuffer): Promise<PassThrough> {

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
        }        
        let combStream: PassThrough = VideoHelper.getCombinedStream(buffers);
        return combStream;
    }    

}//end class