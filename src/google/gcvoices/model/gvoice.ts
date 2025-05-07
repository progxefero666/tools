import { GoogleVoiceInfo } from "./gcvoiceinfo";



/**
 * class GCloudVoice
 */
export class GoogleVoice {
    
    public static build(voiceInfoStr: string): GoogleVoice {
        const data = JSON.parse(voiceInfoStr);
        return new GoogleVoice(data.name, data.gender, data.sampratehe, data.suplanguages);
    }

    public readonly name: string;// unique id
    public readonly gender: string;
    public readonly sampratehe: number;
    public readonly suplanguages: string[];

    constructor(name: string, gender: string, sampratehe: number,suplanguages: string[]) {
        this.suplanguages = suplanguages;
        this.name = name;
        this.gender = gender;
        this.sampratehe = sampratehe;
    }

    public getVoiceInfo():GoogleVoiceInfo {
        return new GoogleVoiceInfo(this.name,this.sampratehe);
    }

    public getJsonString():string {
        return JSON.stringify(this,null,4);
    }

}//end class

/*
const spanishVoice = new VoiceProfile(
  'es-ES-Neural2-B',
  'MALE',
  24000,
   ['es-ES']
);
*/