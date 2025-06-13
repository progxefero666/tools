//src\lib\ai\interface\chatconfig.ts

/**
 * interface ChatConfig
 */
export class ChatConfig {

    public model: string;
    public temperature: number;
    public maxTokens: number;


    constructor(model:string,temperature:number,maxTokens:number) {
        this.model = model;
        this.temperature = temperature;
        this.maxTokens = maxTokens;
    }

}//end class