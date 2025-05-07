
import { AppConstants } from "@/common/app/constants";
import { MMBase } from "../objtypes";


/**
 * class XAudio
 */
export class XAudio {

    public storepath: string = AppConstants.UNDEFINED;

    public id: string;
    public mimetype: string;
    public codec:string = AppConstants.UNDEFINED;    
    public fname: string;
    public size:number;
    public duration: number;
    public channels: number;
    public bitrate: number =0;
    public samplingrate: number =44100;    
   
    public buffer: ArrayBuffer|null;

    constructor(id: string,fname: string,buffer: ArrayBuffer|null,duration: number,size:number,
                channels: number,samplingrate?: number,bitrate?: number,codec?:string){
        this.id=id;
        this.fname=fname;
        this.buffer=buffer;
        this.duration=duration;
        this.size=size;
        this.channels=channels;        
        this.mimetype = MMBase.getAudioMimeType(fname);
        if(samplingrate){this.samplingrate=samplingrate;}
        if(bitrate){this.bitrate=bitrate;}
        if(codec) {this.codec=codec;}        
    }

    public getJsonString(): string {
        const { buffer, ...rest } = this;      
        return JSON.stringify(rest);
    }

    getAudioUrl(): string | null {
        if(!this.buffer){
            return null;
        }
        const blob = new Blob([this.buffer], { type: this.mimetype!});
        return URL.createObjectURL(blob);

    }

    public static build(id: string,fname: string,duration: number,size:number,
                           channels: number,samplingrate?: number,bitrate?: number,codec?:string):XAudio{
        return new XAudio(id,fname,null,duration,size,channels,samplingrate,bitrate,codec);
    }

}//end class