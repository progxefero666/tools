'use server';


import { GoogleTextToSpeech } from '../gtexttospeech';
import { GoogleVoice } from '../../../gcvoices/model/gvoice';
import { OpDataResult } from '@/common/server/model/opdataresult';
import { OpCfg } from '@/common/server/opconfig';
import { GoogleVoiceInfo } from '../../../gcvoices/model/gcvoiceinfo';
import { GoogleVoices } from '@/google/gcvoices/gcvoices';
import { GoogleCloud } from '@/google/googlecloud';

// Ej: "es-ES",100
//getListFilterVoices(language:string,minRate?:number)

export async function getListFilterVoices(language:string,
                                          quality:string,
                                          filtRate:number,
                                          filtGender:string): Promise<string> {  
    /*
    if (!GoogleCloud.checkCredentials()) {
        const actResult:OpDataResult 
            = new OpDataResult(OpCfg.RES_ERROR,"checkCredentials");
        return actResult.toRespFormat();     
    }
    */
    const client = GoogleTextToSpeech.getConnection()!;
    if (!client) {
        const actResult:OpDataResult = new OpDataResult(OpCfg.RES_ERROR,"getConnection");
        return actResult.toRespFormat();     
    }

    let result:boolean = true;
    const filteredVoices: GoogleVoice[] = [];
    let lstVoices = null;
    try {
        let [response] = await client.listVoices({});
        if (response.voices) {
            lstVoices = response.voices;
        }
        else {
            console.error(GoogleVoices.ERR_VOICELIST_EMPTY);
            result = false;            
        }            
    } 
    catch (error) {
        GoogleCloud.showError(error);
        result = false;
    }
    if(!result){
        const actResult:OpDataResult = 
            new OpDataResult(OpCfg.RES_ERROR,OpCfg.RES_UNDEFINED);
        return actResult.toRespFormat();            
    }

    if(lstVoices==null || lstVoices.length==0){
        const actResult:OpDataResult = new OpDataResult(OpCfg.RES_ERROR,"lstVoices empty");
        return actResult.toRespFormat();           
    }
  
    for (const voice of lstVoices) {
        if(!voice.name || !voice.languageCodes?.length) {continue;}
        if(!voice.languageCodes.includes(language))     {continue;}
        if(!voice.naturalSampleRateHertz)               {continue;}
        if(voice.naturalSampleRateHertz<filtRate)       {continue;}

        if( (filtGender!=GoogleVoices.VO_GENDER_ALL) && 
            (voice.ssmlGender != filtGender)) {  
            continue;
        }
        
        if( quality!=GoogleVoices.VO_QUAL_ALL && 
            !GoogleVoices.sameQuality(quality,voice.name)) { 
            continue;
        } 

        filteredVoices.push(new GoogleVoice(
            voice.name,filtGender,
            voice.naturalSampleRateHertz,
            voice.languageCodes));                 
    }

    if(filteredVoices.length==0) {
        console.error(GoogleVoices.ERR_VOICELIST_EMPTY);
        const actResult:OpDataResult = new OpDataResult
            (OpCfg.RES_ERROR,GoogleVoices.ERR_VOICELIST_EMPTY);
        return actResult.toRespFormat();  
    }

    const lisDef: GoogleVoiceInfo[] = GoogleVoices.getListVoicesDef(filteredVoices);
    const actResult:OpDataResult 
        = new OpDataResult(OpCfg.RES_SUCCESS,JSON.stringify(lisDef))
    return actResult.toRespFormat();

} //end 