
import { ESMessage } from '@/common/api/esmessage';
import { FrontData } from '@/application/toolvfa/vfactrbase';
import { VideoHelper } from '@/multimedia/helper/videohelp';
import { CVImage } from '@/multimedia/model/cvimage';
import { XImage } from '@/multimedia/model/ximage';
import { XVideo } from '@/multimedia/model/xvideo';
import { NapiGenMemory } from '@/multimedia/napirs/napgenmemory';
import { NapiHelper } from '@/multimedia/napirs/naphelper';
import { PassThrough } from 'stream';
import { VfaVideoMData } from './vfavigendata';
import { VfaViProcData } from './vfaviprocdata';
import { VfaVideoGenHelper } from './vfavigenhelper';


/**
 * class VfaNapiGen.genTwoImageAlphaCombStream
 */
export class VfaNapiGen {

    static async genOneImageCombStream(sendEvent: (frameInfo: ESMessage) => void,
        procData: VfaViProcData,
        videoMtdata: VfaVideoMData, videoData: XVideo,
        asc: boolean, image: XImage): Promise<PassThrough> {

        let lastSentIntPart = Math.floor(procData.currvalue);
        let alphaRange: number[] = [];
        if (asc) { alphaRange = videoMtdata.alphaRangeAsc; }
        else { alphaRange = videoMtdata.alphaRangeDesc; }

        let alphaUnit: number = 0;
        if (alphaRange[1] >= alphaRange[0]) {
            alphaUnit = (alphaRange[1] - alphaRange[0]) / videoMtdata.elemtrCf;
        }
        else {
            alphaUnit = (alphaRange[0] - alphaRange[1]) / videoMtdata.elemtrCf;
        }
        let buffers: Buffer[] = [];
        let alphaApply: number = alphaRange[0];

        let cvImageA: CVImage = await NapiHelper.getCVImageFromBuffer(image.viBuffer!, image.dimension, image.coords);

        for (let idx = 0; idx < videoMtdata.elemtrCf; idx++) {

            cvImageA.alpha = alphaApply;
            const frameBuffer: Buffer = await NapiGenMemory.genOneImageBuffer(videoData.virect, cvImageA);
            buffers.push(frameBuffer);

            //next
            if (asc) { alphaApply += alphaUnit; }
            else { alphaApply -= alphaUnit; }

            // send message 
            const currentIntPart = Math.floor(procData.currvalue);
            if (currentIntPart !== lastSentIntPart) {
                const frameInfo: ESMessage = new ESMessage(
                    VfaVideoGenHelper.PROCID_CREATEINPUTS, currentIntPart.toString());
                sendEvent(frameInfo);
                lastSentIntPart = currentIntPart;
            }
            // update proc data
            procData.currvalue += procData.unit;
        }

        let combStream: PassThrough = VideoHelper.getCombinedStream(buffers);
        return combStream;

    }//end 

    static async genTwoImageAlphaCombStream(sendEvent: (frameInfo: ESMessage) => void,
                                            procData: VfaViProcData,
                                            videoData: XVideo,
                                            videoMetadata: VfaVideoMData,
                                            imageA: XImage, imageB: XImage): Promise<PassThrough> {

        let lastSentIntPart = Math.floor(procData.currvalue);
        let imgA_alpha = 1.0;
        let imgB_alpha = 0.0;
        let buffers = [];

        let cvImageA: CVImage = await NapiHelper.getCVImageFromBuffer(imageA.viBuffer!, imageA.dimension, imageA.coords);
        let cvImageB: CVImage = await NapiHelper.getCVImageFromBuffer(imageB.viBuffer!, imageB.dimension, imageB.coords);

        for (let idx = 0; idx < videoMetadata.elemtrCf; idx++) {
            cvImageA.alpha = imgA_alpha;
            cvImageB.alpha = imgB_alpha;

            const frameBuffer: Buffer = await NapiGenMemory.genTwoImagesBuffer(videoData.virect, cvImageA, cvImageB);
            buffers.push(Buffer.from(frameBuffer));

            // send message
            const currentIntPart = Math.floor(procData.currvalue);
            if (currentIntPart !== lastSentIntPart) {
                const frameInfo: ESMessage = new ESMessage(
                    VfaVideoGenHelper.PROCID_CREATEINPUTS, currentIntPart.toString());
                sendEvent(frameInfo);
                lastSentIntPart = currentIntPart;
            }
            procData.currvalue += procData.unit;

            //next
            imgA_alpha -= videoMetadata.alphaUnit;
            imgB_alpha += videoMetadata.alphaUnit;
        }

        let combStream: PassThrough = VideoHelper.getCombinedStream(buffers);
        return combStream;

    }//end 

}//end class
