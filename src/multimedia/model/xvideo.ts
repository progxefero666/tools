import { AppConstants } from "@/common/app/constants";
import { Dimension } from "@/common/model/base/dimension";

import { CvRect } from "@/common/graphics/model/cvrect";
import { VideoHelper } from "../helper/videohelp";
import { MMBase } from "../objtypes";
import { FileHelper } from "@/common/util/filehelper";
import { XColor } from "@/common/graphics/color/xcolor";
import { RectColor } from "@/common/graphics/model/rectcolor";
import { Point2D } from "@/common/graphics/model/point2d";


/**
 * class XVideo
 */
export class XVideo {

    public storepath: string = AppConstants.UNDEFINED;
    public coords: Point2D = Point2D.DEF;
    public mimetype: string = AppConstants.UNDEFINED;
    public codec: string = AppConstants.UNDEFINED;
    public id: string;
    public fname: string;
    public fsize: number = 0;
    public duration: number;//seconds
    public dimension: Dimension;
    public backcolor: XColor;
    public framerate:number;	
    public bitrate:string;	
    public resolution:string;
    public virect:RectColor;
    public cvrect:CvRect;
    public countframes:number=0;

    public buffer?: ArrayBuffer;

    constructor(id: string,
                fname: string,
                duration:number,
                dimension: Dimension,
                backcolor: XColor,
                framerate:number,
                bitrate:string,
                codec: string,
                buffer?: ArrayBuffer,
                fsize?: number) {
        this.id = id;
        this.fname = fname;
        this.duration = duration;
        this.dimension = dimension;
        this.backcolor = backcolor;
        this.framerate = framerate;
        this.bitrate = bitrate;
        this.codec = codec;
        if(buffer){this.buffer = buffer;}
        if(fsize) {this.fsize = fsize;}

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