
import { AppConstants } from "@/common/app/constants";
import { MMBase } from "../objtypes";
import { AudioConstants } from "../audioconst";


/**
 * class XAudio
 */
export class XAudio {

    public id: string|null;
    public buffer: ArrayBuffer|null;
    public fname: string;
    public mimetype: string;

    //metadata
    public size: number;
    public duration: number;
    public codec: string = AppConstants.UNDEFINED;
    public channels: number;
    public bitrate: number = 0;
    public samplingrate: number;
    public storepath: string|null = null;

    constructor(fname: string,id?: string,  buffer?: ArrayBuffer, duration?: number, size?: number,
                channels?: number, samplingrate?: number, bitrate?: number, codec?: string) {
        
        this.fname = fname;

        this.id           = id?? null;      
        this.buffer       = buffer ?? null;
        this.duration     = duration ?? 0;
        this.size         = size ?? 0;
        this.channels     = channels ?? AudioConstants.CHANELS_MONO;
        this.samplingrate = samplingrate ?? AudioConstants.DEF_SAMPL_RATE;
        this.bitrate      = bitrate ?? AudioConstants.DEF_BIT_RATE;
        this.codec        = codec ?? AudioConstants.DEF_CODEC;
        this.mimetype     = MMBase.getAudioMimeType(fname);
    }

    public getJsonString(): string {
        const { buffer, ...rest } = this;
        return JSON.stringify(rest);
    }

    getAudioUrl(): string | null {
        if (!this.buffer) {
            return null;
        }
        const blob = new Blob([this.buffer], { type: this.mimetype! });
        return URL.createObjectURL(blob);

    }

    public static build(id: string|null, fname: string, duration: number, size: number,
        channels: number, samplingrate?: number, bitrate?: number, codec?: string): XAudio {
        return new XAudio(fname, id ?? undefined, undefined, duration, size, channels, samplingrate, bitrate, codec);
    }

}//end class