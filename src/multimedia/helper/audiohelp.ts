
import * as mm from "music-metadata";

import { TimeUtil } from "@/common/util/timeutil";
import { XAudio } from "../model/xaudio";



/**
 * class AudioHelper.getXAudioMp3FromBuffer
 */
export class AudioHelper {

    public static getAudioUrl(buffer: Buffer,mimetype:string): string {
        const blob = new Blob([buffer], { type: mimetype!});
        return URL.createObjectURL(blob);
    }

    static async processXAudio(id: string, file: File): Promise<XAudio | null> {
        try {
            const audioBuffer = await file.arrayBuffer();
            const metadata = await mm.parseBlob(file);
            let duration = TimeUtil.roundedSeconds(metadata.format.duration!);
            let samplingrate = metadata.format.sampleRate!;
            let bitrate = metadata.format.bitrate!;
            let numchannels = metadata.format.numberOfChannels || 2;
            let codec = metadata.format.codec!;
            return new XAudio(id, file.name, audioBuffer, duration, file.size,
                             numchannels, samplingrate, bitrate, codec);
        }
        catch (error) {
            return null;
        }
    }

    static async getXAudioMp3FromBuffer(id:string,buffer: Buffer): Promise<XAudio> {
        const fname:string = id.concat(".mp3");
        const uint8Array    = new Uint8Array(buffer);
        const arrayBuffer: ArrayBuffer = uint8Array.buffer;

        const metadata   = await mm.parseBuffer(buffer, { mimeType: "audio/mp3"});
        let duration     = TimeUtil.roundedSeconds(metadata.format.duration!);
        let samplingrate = metadata.format.sampleRate!;
        let bitrate      = metadata.format.bitrate!;
        let numchannels  = metadata.format.numberOfChannels || 2;
        let codec        = metadata.format.codec!;
        return new XAudio(id,fname, arrayBuffer, duration,0,
                         numchannels, samplingrate, bitrate, codec);
    }

    /*
    XAudio
    public static async getMetadataFromObjectUrl(objectUrl: string): Promise<mm.IAudioMetadata | null> {
        try {
            // Fetch la URL (ObjectURL apunta a un Blob en memoria)
            const response = await fetch(objectUrl);
            const blob = await response.blob();

            // Parsear metadatos desde el Blob
            const metadata = await mm.parseBlob(blob);
            return metadata;
        } catch (error) {
            console.error("Error fetching metadata:", error);
            return null;
        }
    }    
    */


}//end class