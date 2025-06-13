//src\catalogs\anthropic

/*
claude-opus-4
claude-sonnet-4
claude-sonnet-3.7
claude-3-5-sonnet-20241022
claude-3-5-haiku-20241022
*/

/**
 * class Anthropic.MOTOR_SONNET_3
 */
export class IAnthropic {

    public static readonly MOTOR_CLAUDE_OPUS4: string = "claude-opus-4";
    public static readonly MOTOR_SONNET_4: string = "claude-opus-4";
    public static readonly MOTOR_SONNET_37: string = "claude-sonnet-3.7";
    public static readonly MOTOR_HAIKU_35: string = "claude-3-5-haiku-20241022";
    public static readonly MOTOR_SONNET_35: string = "claude-3-5-sonnet-20241022";
    public static readonly MOTOR_SONNET_3: string = "claude-3-sonnet-20240229";


    public static readonly MOTORS: string[] = [
        IAnthropic.MOTOR_CLAUDE_OPUS4,
        IAnthropic.MOTOR_SONNET_4,
        IAnthropic.MOTOR_SONNET_37,
        IAnthropic.MOTOR_HAIKU_35,
        IAnthropic.MOTOR_SONNET_35,
        IAnthropic.MOTOR_SONNET_3
    ];

    public static USE_IN_CHATBOT: string = IAnthropic.MOTOR_HAIKU_35;

}//end class