//src\app\module\aichatbot\chatbot_style.ts

import { AiRoles } from "@/lib/ai/types/aitypes";


/**
 * class AiChatBotStyle.DATE_STYLE
 */
export class AiChatBotStyle {

    public static readonly LOADING_STYLE:string = "mr-auto bg-gray-200 text-black p-3 rounded-lg max-w-[70%]";
    public static readonly ERROR_STYLE:string = "mr-auto bg-red-200 text-red-800 p-3 rounded-lg max-w-[70%]";

    public static readonly DATE_STYLE:string = "text-xs opacity-70";
    
    //"text-xs opacity-70"
    public static getMessageStyle = (role: any): string => {
        let className: string = "mb-2 p-3 rounded-lg max-w-[70%] ";
        if (role === AiRoles.USER) {
            className += "ml-auto bg-blue-500 text-white";
        }
        else {
            className += "mr-auto bg-gray-200 text-black";
        }
        return className;
    }

}//end class