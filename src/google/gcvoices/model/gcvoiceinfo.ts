

/**
 * class GCloudVoiceInfo
 */
export class GoogleVoiceInfo {

    public static build(voiceInfoStr:string):GoogleVoiceInfo{
        const data = JSON.parse(voiceInfoStr);
        return new GoogleVoiceInfo(data.name, data.rate);
    }

    public name: string;
    public rate: number;

    constructor(name: string, rate: number) {
        this.name = name;
        this.rate = rate;
    }

    public getJsonString():string {
        return JSON.stringify(this);
    }

}//end class