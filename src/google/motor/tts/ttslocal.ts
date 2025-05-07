
import * as mm from 'music-metadata';

import { OpDataResult } from "@/common/server/model/opdataresult";
import { OpCfg } from "@/common/server/opconfig";
import { GoogleVoiceInfo } from "../../gcvoices/model/gcvoiceinfo";
import { getListFilterVoices } from "@/google/motor/tts/service/getfiltervoices";
import { storeAudioFileMP3 } from "@/google/motor/tts/service/storeaudiomp3";
import { getSpeechMP3 } from "@/google/motor/tts/service/getspeechmp3";
import { AudioHelper } from "@/multimedia/helper/audiohelp";
import { MMBase } from "@/multimedia/objtypes";
import { getSpeechHQ } from "./service/getspeechhq";
import { TimeUtil } from '@/common/util/timeutil';
import { XAudio } from '@/multimedia/model/xaudio';


/**
 * class TtsLocalService.genTextToAudioMP3(userId:number,fname:string,
                                  language:string,voiceName:string,text: string)
 */
export class TtsLocalService {

    public static readonly VO_GENDER_MALE: string    = "MALE";
    public static readonly VO_GENDER_FEMALE: string  = "FEMALE";
    public static readonly VO_GENDER_NEUTRAL: string = "NEUTRAL";
    public static readonly VO_GENDER_ALL: string     = "ALL";

    public static readonly listVoGeners: string[] = [
        TtsLocalService.VO_GENDER_MALE,
        TtsLocalService.VO_GENDER_FEMALE,
        TtsLocalService.VO_GENDER_NEUTRAL,
        TtsLocalService.VO_GENDER_ALL
    ];

    //language ->"es-ES"
    //GcMotorTextToSpeech.VO_GENDER_MALE
    static async chargeListVoices(language: string,quality:string, gender: string): Promise<GoogleVoiceInfo[]> {

        const strresult: string = await getListFilterVoices(language, quality, 2300, gender);
        const psresult: { result: string; message?: string; data?: string } = JSON.parse(strresult);
        const opresult: OpDataResult = new OpDataResult(
            psresult.result,
            psresult.data
        );
        let lisDef: GoogleVoiceInfo[] = [];
        if (opresult.result == OpCfg.RES_SUCCESS) {
            const voicesData: GoogleVoiceInfo[] = JSON.parse(opresult.data);
            lisDef = voicesData.map(voice =>
                new GoogleVoiceInfo(voice.name, voice.rate)
            );
        }
        return lisDef;
    }

    static getListVoiceNames(listVoicesDef: GoogleVoiceInfo[]): string[] {
        let lstNames: string[] = [];
        for (const item of listVoicesDef) {
            lstNames.push(item.name);
        }
        return lstNames;
    }

    static async genTextToAudioMP3(userId:number,fname:string,
                                  language:string,voiceName:string,text: string): Promise<boolean> {
        const result:boolean = await storeAudioFileMP3(userId,fname,language,voiceName,text);
        return result;
    }

    
    public static async syntTextAudioMp3(language: string,voiceName: string,text: string): Promise<XAudio | null> {
        try {
            const buffer: Buffer | null = await getSpeechMP3(language, voiceName, text);
            if (!buffer) return null;

            const xaudio:XAudio = await AudioHelper.getXAudioMp3FromBuffer("id",buffer);
            return xaudio;
            //return AudioHelper.getAudioUrl(buffer, MMBase.MIMETYPE_AUDIO_MPEG );
        }
        catch (error) {
            console.error("Error: synthesizeAudio", error);
            return null;
        }
    }

    public static async syntTextAudioHQ(language: string,voiceName: string,text: string): Promise<string | null> {
        try {
            const buffer: Buffer | null = await getSpeechHQ(language, voiceName, text);
            if (!buffer) return null;
            return AudioHelper.getAudioUrl(buffer, MMBase.MIMETYPE_AUDIO_WAV );
        }
        catch (error) {
            console.error("Error: synthesizeAudio", error);
            return null;
        }
    }    
        
}//end class