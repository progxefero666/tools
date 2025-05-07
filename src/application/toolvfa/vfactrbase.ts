
import { AppConstants } from "@/common/app/constants";
import { HtmlCompTypes } from "@/common/html/html";
import { HtmlForm } from "@/common/html/htmlform";
import { HtmlFormComponent } from "@/common/html/htmlformcomp";
import { FileHelper } from "@/common/util/filehelper";
import { VfaVideo } from "./vfavideo";
import { VideoConstants } from "@/multimedia/videoconst";
import { XImage } from "@/multimedia/model/ximage";
import { AppApi } from "@/application/appapi";
import { MMDimProfiles } from "@/multimedia/profiles";
import { XAudio } from "@/multimedia/model/xaudio";
import { AudioHelper } from "@/multimedia/helper/audiohelp";
import { RectColor } from "@/common/graphics/model/rectcolor";

import { AppUI } from "@/style/appui";
import { GraphUtil } from "@/common/graphics/util/graphutil";
import { Point2D } from "@/common/graphics/model/point2d";
import { Dimension } from "@/common/model/base/dimension";
import { IdHelper } from "@/common/util/idhelper";
import { MMBase } from "@/multimedia/objtypes";
import { getViImagenArrayBuffer, ImageHelper } from "@/multimedia/helper/imagehelp";

import { storeDoc, storeAudio, storeImageAsPng } from "../server/serverservice";

import { VfaCvVideo } from "./vfavideocv";
import { ImageFrame } from "@/multimedia/model/imgframe";
import { ViImagerame } from "@/multimedia/model/videoimgframe";

/**
 * class FrontData
 */
export class FrontData {
    
    public static FORM_A = new HtmlForm([
        new HtmlFormComponent(HtmlCompTypes.INPUT_NUMBER, "framerate", VideoConstants.DEF_FRAMERATE, "framerate"),
        new HtmlFormComponent(HtmlCompTypes.INPUT_TEXT, "name", "default", "name"),
        new HtmlFormComponent(HtmlCompTypes.SELECT, "format",AppUI. videoOutputformats[0], "format", AppUI.videoOutputformats),
        new HtmlFormComponent(HtmlCompTypes.SELECT, "dimension", MMDimProfiles.ALL_REP[0], "dimension", MMDimProfiles.ALL_REP),
        new HtmlFormComponent(HtmlCompTypes.INPUT_COLOR, "backcolor", "#000000", "back color"),
        new HtmlFormComponent(HtmlCompTypes.INPUT_CHECK, "applytrans", true, "apply trans"),
        new HtmlFormComponent(HtmlCompTypes.INPUT_RANGE, "transvelocity", 4, "t. velocity"),
        new HtmlFormComponent(HtmlCompTypes.FILE, "audiofile", AppConstants.UNDEFINED_FILE, "audio file")
    ]);


    public static getUserVideoGenPath(userId: number): string {
        return AppApi.API_TOOLVFA_VIGEN.concat(`?userId=${userId}`);      
    }    
}//end class


/**
 * class FrontProcess.getCvVideoFrames
 */
export class FrontProcess {
    
    public static readonly PROC_PROGRESS_LEN:number = 100.0;
    public static readonly PROCID_CREATEINPUTS:string = "createinputs";
    public static readonly PROCID_SAVEVIDEO:string = "savevideo";

    public static readonly FILE_AUDIO_ID:string = "toolvfa";
    public static readonly FILE_VIDEO_ID:string = "toolvfa";

    public static readonly PROC_PROGLEN:number = 100.0;

    static async processXAudio(file: File): Promise<XAudio| null> {
        const  dataXAudio:XAudio| null = await AudioHelper.processXAudio(FrontProcess.FILE_AUDIO_ID,file);
        return dataXAudio;
    }

    public static async getFileImage  (viRect: RectColor,file: File,orden:number,expanded: boolean): Promise<XImage> {

        const imObject          = await ImageHelper.getImage(file);
        const imMimetype:string = MMBase.getImageFileMimeType(file.name);
        const imDim:Dimension   = new Dimension(imObject.width, imObject.height);    
        const viDim:Dimension   = GraphUtil.getEscDimensionByParent(viRect.dimension, imDim);
        const viCoords:Point2D  = GraphUtil.getCenteredOrigin(viRect.dimension, viDim);
        const imUrlObj          = await ImageHelper.getHtmImageDataURL(imObject,imMimetype,viDim);
        const thUrlObj          = await ImageHelper.getHtmImageDataURL(imObject,imMimetype,AppUI.getImgThumsSize());   

        const imbuffer: ArrayBuffer = await ImageHelper.dataURLToArrayBuffer(imUrlObj);
        const vibuffer: ArrayBuffer = await getViImagenArrayBuffer
            (viRect.dimension,viRect.cvcolor,imMimetype,imObject,viDim,viCoords);

        const elem:XImage = new XImage( IdHelper.getRandomInt(),
                                        file.name,viDim,viCoords,orden,expanded,
                                        imbuffer,vibuffer,imUrlObj,thUrlObj);   
        return elem;
    }    

    //const viRectColor: RectColor = new RectColor(xvideo.dimension,xvideo.backcolor);
    static async getListFileImages (viRectColor: RectColor,files: FileList,expanded: boolean): Promise<XImage[]>  {
        const newElements: Array<XImage> = [];
        for (let orden = 0; orden < files.length; orden++) {
            const elem:XImage = await FrontProcess.getFileImage(viRectColor,files[orden],orden,expanded);      
            newElements.push(elem);
        }
        return newElements;  
    }

    
    public static getCvVideo(toolData: VfaVideo): VfaCvVideo {
        const cvVideo:VfaCvVideo = new VfaCvVideo(
            toolData.xvideo.framerate,
            toolData.xvideo.cvrect,
            toolData.xvideo.duration,
            toolData.applytrans,
            toolData.transvelocity);
        return cvVideo;
    }

    public static getCvVideoFrames(cvVideo: VfaCvVideo,countElems:number): ViImagerame[] {
        const alphaUnit = 1.0 / cvVideo.elemTrDuration;
        const secToImageNext = cvVideo.getSecondsPerNextImage(countElems);
        let countNr:number = 0;//for debug
        let countTr:number = 0;//for debug
        let frames:ViImagerame[] = [];
        let frameIndex:number=0;
        for(let elemIndex=0;elemIndex<countElems;elemIndex++){
            if(elemIndex<1){
                const nrFrame:ViImagerame =  ViImagerame.buildOne(new ImageFrame(elemIndex,0.0));
                let frAlpha = 0.0;
                for(let elemFrIndex=0;elemFrIndex<cvVideo.elemTrDuration;elemFrIndex++){
                    const elem_nrFrame = nrFrame.clone();
                    elem_nrFrame.imgframes[0].alpha=frAlpha;
                    frames[frameIndex] = elem_nrFrame;
                    frameIndex++;
                    frAlpha += alphaUnit;
                    countTr++;                     
                }                
            }
            else {
                const nrFrame:ViImagerame =  ViImagerame.buildTwo(
                    new ImageFrame(elemIndex-1,0.0),
                    new ImageFrame(elemIndex,0.0));
                let frAlphaOld = 1.0;
                let frAlphaNew = 0.0;
                for(let elemFrIndex=0;elemFrIndex<cvVideo.elemTrDuration;elemFrIndex++){
                    const elem_nrFrame = nrFrame.clone();
                    elem_nrFrame.imgframes[0].alpha=frAlphaOld;
                    elem_nrFrame.imgframes[1].alpha=frAlphaNew;
                    frames[frameIndex] = elem_nrFrame;
                    frameIndex++;
                    frAlphaOld -= alphaUnit;
                    frAlphaNew += alphaUnit;
                    countTr++;
                }                
            }
            const nrFrame:ViImagerame =  ViImagerame.buildOne(new ImageFrame(elemIndex,1.0));
            for(let elemFrIndex=0;elemFrIndex<secToImageNext;elemFrIndex++){
                frames[frameIndex] = nrFrame.clone();
                countNr++; 
                frameIndex++;
            }
        }//end for
        //cu.c("countNr",countNr);
        //cu.c("countTr",countTr);
        return frames;
    }

}//end class

export class ServerProcess {

    public static async storeDataStep1(userId: number,vfaVideo:VfaVideo): Promise<boolean> {
        try {
            const jsonData = JSON.stringify(vfaVideo,null,4);
            
            const arrayBuffer = FileHelper.stringToArrayBuffer(jsonData);
            let result = await storeDoc(userId, arrayBuffer);
            if (!result) { return false; }    
            return await storeAudio(userId,vfaVideo.audio.fname,vfaVideo.audio.buffer!);
        }
        catch (error) { 
            console.error("Error", error); 
            return false;
        }        
    }

    public static async storeDataStep2(userId: number, vfaVideo: VfaVideo): Promise<boolean> {
        
        // store VfaVideo image elements
        let result = true;
        for (const mmItem of vfaVideo.elements) {
            const ext = FileHelper.getFileExtension(mmItem.fname);
            const nameBase = FileHelper.getFileName(mmItem.fname);

            mmItem.mimetype
            
            result = await storeImageAsPng(userId,mmItem.mimetype,
                nameBase.concat("_t"),mmItem.imArrayBuffer);

            if(!result){result=false;break;}

            result = await storeImageAsPng(userId,mmItem.mimetype,nameBase.concat("_n"),mmItem.viArrayBuffer);
            if(!result){result=false;break;}
        };
        if(!result){return false;}

        // store VfaVideo json document
        const jsonData = vfaVideo.getJsonString();         
        const arrayBuffer = FileHelper.stringToArrayBuffer(jsonData);
        result = await storeDoc(userId, arrayBuffer);

        return  true;
    }

    
}//end class





