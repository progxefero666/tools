'use server';


import { GoogleTextToSpeech } from '../gtexttospeech';
import { GoogleVoice } from '../../../gcvoices/model/gvoice';
import { GoogleCloud } from '@/google/googlecloud';
import { GoogleVoices } from '@/google/gcvoices/gcvoices';

export async function getListAllVoices(): Promise<boolean> {
    
    // 1. check env var
    if (!GoogleCloud.checkCredentials()) {return false;}
    
    const client = GoogleTextToSpeech.getConnection();
    if(client==null){return false;}

    let result:boolean = true;
    const voices: GoogleVoice[] = [];
    try {
        const [response] = await client.listVoices({});        
        if (response.voices) {
            for (const voice of response.voices) {
                if (!voice.name) {
                    console.error(GoogleVoices.ERR_VOICE_INVALID, voice);
                    result = false;continue;
                }
                const gender: string = String(voice.ssmlGender ?? "MALE");
                const sampratehe   = voice.naturalSampleRateHertz || 0;
                const currentVoice = new GoogleVoice
                    (voice.name,gender,sampratehe,voice.languageCodes||[]);
                voices.push(currentVoice);
            }
        }   
        else {
            console.error(GoogleVoices.ERR_VOICELIST_EMPTY);
            result = false;
        }     
    } 
    catch (error) {
        GoogleCloud.showError(error)
        result =  false;
    }

    return result;

}//end function