
import { CvRect } from "@/common/graphics/model/cvrect";
import { cu } from "@/common/util/consolehelper";
import { FrontProcess } from "./vfactrbase";
import { VideoHelper } from "@/multimedia/helper/videohelp";
import { ViImagerame } from "@/multimedia/model/videoimgframe";

/**
 * class VfaCvVideo
 */
export class VfaCvVideo {
    public resolution: string;
    public framerate:number;
    public virect:CvRect;
    public duration: number;    
    public applytrans: boolean;
    public alphaUnit: number=0;

    public frames:ViImagerame[] = [];

    public countElems:number=0;
    public elemDuration:number=0;
    public elemNrDuration:number=0;
    public elemTrDuration:number=0;

    constructor(framerate:number,virect:CvRect,duration: number,
                applytrans: boolean,transvelocity?: number){
        this.framerate=framerate;
        this.virect=virect;
        this.duration=duration;       
        this.applytrans=applytrans;        
        if(transvelocity){
            this.elemTrDuration=transvelocity;
            this.alphaUnit=(1.0 / this.elemTrDuration);
        }        
        else{
            this.elemTrDuration=0;
            this.alphaUnit=0;
        }
        this.resolution = VideoHelper.getResolution(this.virect.dimension);
    }

    public getCountFrames():number {
        return this.frames.length;
    }

    public updateCvVideo(countElems:number):void {
        this.countElems=countElems;
        if(countElems>0){
            this.elemDuration = this.getSecondsPerImage(this.countElems);
            this.frames = FrontProcess.getCvVideoFrames(this,countElems);            
            //this.outputJsonArray();
        }
        else{
            this.elemDuration = 0;
            this.frames = [];
        }
    }

    public outputJsonArray():void {
        cu.sep();
        let countNr:number = 0;
        let countTr:number = 0;
        for(let frIndex=0;frIndex<this.frames.length;frIndex++){
            const currFrame = this.frames[frIndex];
            if(currFrame.imgframes.length==1){
                countNr++;
            }
            else {
                if(currFrame.imgframes[1].alpha>0 && currFrame.imgframes[1].alpha< 1  ){
                    cu.c("frIndex",frIndex);
                }                    
                countTr++; 
            }            
        }        
        //cu.c("countNr",countNr);
        //cu.c("countTr",countTr);
    }

    public getSecondsPerNextImage(countImages: number): number {
        const secPerImge = this.getSecondsPerImage(countImages);
        return secPerImge - this.elemTrDuration;
    }

    public getSecondsPerImage(countImages: number): number {
        return Math.floor(this.duration / countImages);
    }

    public getElemStartFrameIndex(elemIndex:number):number {
        let frIndex:number = 5;
        if(elemIndex>0) {
            frIndex = (this.elemDuration * (elemIndex));
        }
        return frIndex;    
    }


}//end class