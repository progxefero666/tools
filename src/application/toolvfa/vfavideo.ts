
import { Dimension } from "@/common/model/base/dimension";
import { XVideo } from "@/multimedia/model/xvideo";
import { FrontData, FrontProcess } from "@/application/toolvfa/vfactrbase";
import { VideoConstants } from "@/multimedia/videoconst";
import { FileHelper } from "@/common/util/filehelper";
import { XAudio } from "@/multimedia/model/xaudio";
import { XImage } from "@/multimedia/model/ximage";
import { XColor } from "@/common/graphics/color/xcolor";
import { VfaVideoMData } from "@/application/toolvfa/motor/vfavigendata";
import { TimeUtil } from "@/common/util/timeutil";

/**
 * class VfaVideo
    VideoConstants.BITRATE_2500 = "2500k";
    VideoConstants.CODEC_H264_AVC: string = "libx264";
 */
export class VfaVideo {

    public static readonly ELEM_DUR_MIX:number = 1000;//in miliseconds
    public static readonly COUNT_ELEMS_MIN:number = 3;

    public audio:XAudio;
    public xvideo:XVideo;    
    public applytrans: boolean = true;
    public transvelocity: number = 4;
    public elements: XImage[] = [];
    public countElementsMax:number=0;
    

    public mtdata: VfaVideoMData = VfaVideoMData.DEF;

    constructor(audio:XAudio,name:string,ext:string,dimension:Dimension,
                rgbacolor:XColor,applytrans: boolean,transvelocity?: number){

        this.audio  = audio;
        const fname = FileHelper.generateFileName(name,ext);    
        this.xvideo = new XVideo(null,fname,this.audio.duration, dimension,rgbacolor, 
            VideoConstants.DEF_FRAMERATE, VideoConstants.BITRATE_2500,VideoConstants.CODEC_H264_AVC);  

        this.applytrans=applytrans;
        if(transvelocity){
            this.transvelocity=transvelocity;
        }
    }

    public loadInitParams(){
        const elemDurMinSec = TimeUtil.milisecToSeconds(VfaVideo.ELEM_DUR_MIX);
        if(this.applytrans){            
            const valueCalc = (elemDurMinSec + this.transvelocity) * this.xvideo.framerate;
            this.countElementsMax = Math.floor(this.xvideo.countframes / valueCalc);
        }
        else {
            const valueCalc = elemDurMinSec  * this.xvideo.framerate;
            this.countElementsMax = Math.floor(this.xvideo.countframes / valueCalc);
        }
    
    }                
    public getOneTransCountFrames():number {
        return Math.floor(this.xvideo.framerate * this.transvelocity);
    }

    public setElements(elements: XImage[]):void {
        this.elements = elements;
    }

    public setMetadata(newmtdata: VfaVideoMData):void {
        this.mtdata = newmtdata;
    }

    

    public getJsonString(): string {
        const result = { ...this };
        /*
        result.elements = this.elements.map(element => {
            return JSON.parse(element.getJsonString());
        });
        if(this.xvideo.buffer){
            result.xvideo = JSON.parse(this.xvideo.getJsonString());
        }
        */
        if(this.audio.buffer){
            result.audio = JSON.parse(this.audio.getJsonString());
        }
        return JSON.stringify(result, null, 4);
    }
        
 

}//end class