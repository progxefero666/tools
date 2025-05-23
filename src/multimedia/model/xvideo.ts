import { AppConstants } from "@/common/app/constants";
import { Dimension } from "@/common/model/base/dimension";

import { CvRect } from "@/common/graphics/model/cvrect";
import { VideoHelper } from "../helper/videohelp";
import { MMBase } from "../objtypes";
import { FileHelper } from "@/common/util/filehelper";
import { XColor } from "@/common/graphics/color/xcolor";
import { RectColor } from "@/common/graphics/model/rectcolor";
import { Point2D } from "@/common/graphics/model/point2d";
import { VideoConstants } from "../videoconst";


/**
 * class XVideo
 *  VideoConstants.BITRATE_2500 = "2500k";
    VideoConstants.CODEC_H264_AVC: string = "libx264";
    VideoConstants.DEF_FRAMERATE: number = 30;
 */
export class XVideo {


    public id: string|null;
    public buffer?: ArrayBuffer;
    public fname: string;
    public mimetype: string = AppConstants.UNDEFINED;
    public dimension: Dimension;
       	    
    public resolution:string;
    public virect:RectColor;
    public cvrect:CvRect;

    public countframes:number=0;
    public backcolor: XColor = new XColor(0,0,0,1);
    public fsize: number = 0;
    public duration: number= 0;   
    public codec: string = VideoConstants.CODEC_H264_AVC;
    public bitrate:string = VideoConstants.BITRATE_2500;	
    public framerate:number = VideoConstants.DEF_FRAMERATE;
    public coords: Point2D = Point2D.DEF;
    public storepath: string | null = null;
   
    constructor(id: string|null,fname: string,duration:number|null,dimension: Dimension,backcolor: XColor,
                framerate?:number,bitrate?:string,codec?:string,buffer?:ArrayBuffer,fsize?:number) {       
        this.fname      = fname;        
        this.dimension  = dimension;
        
        this.id = id ?? null;
        if(duration) {this.duration = duration;}
        if(backcolor) {this.backcolor = backcolor;}
        if(framerate) {this.framerate = framerate;}
        if(bitrate)   {this.bitrate = bitrate;}
        if(codec)     {this.codec = codec;}        
        if(buffer)    {this.buffer = buffer;}
        if(fsize)     {this.fsize = fsize;}

        this.mimetype    = MMBase.getVideoExtMimeType(FileHelper.getFileExtension(fname));
        this.resolution  = VideoHelper.getResolution(this.dimension);
        this.virect      = new RectColor(this.dimension,this.backcolor);
        this.cvrect      = new CvRect(this.dimension,this.backcolor.cvcolor)        
        this.countframes = Math.ceil(this.framerate * this.duration);
    }

    public getJsonString(): string {
        const { buffer, ...rest } = this;      
        return JSON.stringify(rest);
    }

    public getViUrlObject(): string {
        const blob = new Blob([this.buffer!], {type: this.mimetype});
        return URL.createObjectURL(blob);
    }

}//end class