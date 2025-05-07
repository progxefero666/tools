
import { WriteStream, createWriteStream } from 'node:fs';
import { Writer } from 'wav';
import { AudioConstants } from "@/multimedia/audioconst";
import { GoogleTextToSpeech } from '../motor/tts/gtexttospeech';
import { GoogleCloud } from '../googlecloud';
import { SystemFileUtil } from '@/common/server/systemfileutil';


export class GcAudioHelper {

    /**
     * createAudioFile mp3
     */
    public static async createAudioFileMP3(oupath: string, audioContent: string | Uint8Array): Promise<boolean> {
        let arrayBuffer: ArrayBuffer;
        if (typeof audioContent === 'string') {
            arrayBuffer = Buffer.from(audioContent, 'base64').buffer as ArrayBuffer;
        } 
        else {
            arrayBuffer = audioContent.buffer as ArrayBuffer;
        }
        return await SystemFileUtil.createFile(arrayBuffer, oupath);        
    }

    /**
     * createAudioFile avi
     */
    public static async createAudioFileHQ(oupath:string, sampleRate: number,
                                        audioContent: string | Uint8Array ): Promise<boolean> { 
        try {
            const audioBuffer = typeof audioContent === "string"
                ? Buffer.from(audioContent, AudioConstants.TYPE_BASE64)
                : Buffer.from(audioContent);
            const writer = new Writer({
                sampleRate,
                channels: AudioConstants.CHANELS_MONO,
                bitDepth: AudioConstants.DEF_BITDEPTH,
            });
            const fileStream: WriteStream = createWriteStream(oupath);
            writer.pipe(fileStream);
            writer.write(audioBuffer);
            writer.end();
            return await new Promise<boolean>((resolve) => {
                fileStream.on('finish', () => {
                    console.log(GoogleCloud.INF_AU_FILE_GENSUCCESS
                               .concat(":").concat(oupath))
                    resolve(true);
                });
                fileStream.on('error', (error) => {
                    GoogleCloud.showError(error);
                    resolve(false);
                });
            });
        } 
        catch (error) {
            GoogleCloud.showError(error);
            return false;
        }
    }

} //end class