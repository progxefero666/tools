'use server';

import { GoogleCloud } from '@/google/googlecloud';
import { GoogleTextToSpeech } from '@/google/motor/tts/gtexttospeech';
import { GcAudioHelper } from '@/google/gcaudios/gcaudiohelper';
import { GcServerStorage } from './gcservstorage';

export async function storeAudioFileMP3(userId: number,fname:string,
                                        language:string,
                                        voiceName:string,
                                        text:string): Promise<boolean> {

    // 1. Validar credenciales y conexión
    if (!GoogleCloud.checkCredentials()) return false;
    const client = GoogleTextToSpeech.getConnection();
    if (client === null) return false;

    let result:boolean = true;
    try {
        const [response] = await client.synthesizeSpeech({
            input: { text },
            voice: { name: voiceName, languageCode: language },
            audioConfig: { audioEncoding: "MP3" }
        });
        
        if (!response.audioContent) {
            console.error(GoogleCloud.ERR_UNKNOW, GoogleCloud.ERR_AUDIO_NOT_CONTENT);
            result= false;
        }
        else {
            if (!response.audioContent || 
                (typeof response.audioContent !== 'string' && !(response.audioContent instanceof Uint8Array))) {
                console.error(GoogleCloud.ERR_UNKNOW, GoogleCloud.ERR_AUDIO_NOT_CONTENT);
                result= false;
            }
        }
        if(result){
            const outputPath: string = GcServerStorage.getAudioFilePath(userId, fname);
            let audioContent: Uint8Array;            
            if (typeof response.audioContent === 'string') {
                audioContent = new Uint8Array(Buffer.from(response.audioContent, 'base64'));
            } 
            else {
                audioContent = response.audioContent as Uint8Array;
            }
            result = await GcAudioHelper.createAudioFileMP3(outputPath, audioContent);
        }
    } 
    catch (error) {
        GoogleCloud.showError(error);
        result= false;
    }
    return result;

} //end