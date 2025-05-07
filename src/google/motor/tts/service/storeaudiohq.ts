'use server';

import { GoogleCloud } from '@/google/googlecloud';
import { GoogleTextToSpeech } from '@/google/motor/tts/gtexttospeech';

import * as fs from 'node:fs';
import { Writer } from 'wav';
import {AudioConstants} from "@/multimedia/audioconst";

import { GcAudioHelper } from '@/google/gcaudios/gcaudiohelper';

import { GcServerStorage } from './gcservstorage';
import { GoogleVoiceInfo } from '@/google/gcvoices/model/gcvoiceinfo';
import { GoogleVoices } from '@/google/gcvoices/gcvoices';


/**
 * Server Action: use Google Cloud API 
 *  service:      textToSpeech 
 *  description:  store high quality audios in wav format
 * @param language : common for input text and ouput audio
 * @param strvoiceinf : voice name and rate
 * @param oupath : output file audio path.
 * @returns 
 */
export async function storeTextAudioFileHQ(userId: number,
                                           fname:string,
                                           language:string,
                                           text:string,
                                           strvoiceinf:string ): Promise<boolean> {
    // 1. Validar credenciales y conexión
    if (!GoogleCloud.checkCredentials()) return false;
    const client = GoogleTextToSpeech.getConnection();
    if (client === null) return false;

    try {
        const voiceInfo = GoogleVoiceInfo.build(strvoiceinf);
        const [response] = await client.synthesizeSpeech({
            input:       {text},
            voice:       {name:voiceInfo.name,languageCode:language},
            audioConfig: {audioEncoding:"LINEAR16"}
        });
        if (!response.audioContent) {
            console.error(GoogleCloud.ERR_UNKNOW,
                         GoogleCloud.ERR_AUDIO_NOT_CONTENT);
            return false;
        }
        const outputPath:string = GcServerStorage.getAudioFilePath(userId,fname);
        const success = await GcAudioHelper.createAudioFileHQ(
            outputPath,
            voiceInfo.rate,
            response.audioContent
        );
        if(!success){return false;}        
        console.log("generation f audio success");    
        return true;
    } 
    catch (error) {
        console.log("generation f audio error");  
        GoogleCloud.showError(error);
        return false;
    }

}