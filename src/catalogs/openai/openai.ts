//src\catalogs\openai\openai.ts

/**
 * class OPenAI
 */
export class OPenAI {

    /*
     GPT-4o	
gpt-4o
GPT-4-turbo
gpt-4-turbo
GPT-3.5-turbo	
gpt-3.5-turbo	
     */

    public static readonly MOTOR_CLAUDE_OPUS4: string = "claude-opus-4";
    public static readonly MOTOR_SONNET_4: string = "claude-opus-4";
    public static readonly MOTOR_SONNET_37: string = "claude-sonnet-3.7";

    public static readonly MOTORS: string[] = [
        OPenAI.MOTOR_CLAUDE_OPUS4,
        OPenAI.MOTOR_SONNET_4,
        OPenAI.MOTOR_SONNET_37,
    ];

    public static USE_IN_CHATBOT: string = OPenAI.MOTOR_CLAUDE_OPUS4;

}//end class