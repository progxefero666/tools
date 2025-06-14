//src\app\module\aichatbot\chatbot_style.ts

import { AiRoles } from "@/lib/ai/types/aitypes";


/**
 * class AiChatBotStyle.CONT_INPUT_AREA_STYLE
 */
export class AiChatBotStyle {

    public static readonly CONT_INPUT_AREA_STYLE:string = "flex flex-col flex-shrink-0 mx-2 mb-2";
    public static readonly CONTAINER_STYLE:string = "ai_chatbot_interface  flex flex-col px-2 h-screen";
    public static readonly MESSAGES_AREA_STYLE:string = "flex-1 overflow-y-auto mt-2 mx-2 pb-4";
    public static readonly TEXT_AREA_STYLE:string = "textarea textarea-accent w-full arrow-up rounded-none border-transparent";
    public static readonly INPUT_AREA_STYLE:string = "w-full flex flex-col pl-3 pr-3 pt-3 rounded-lg border";
    public static readonly INPUT_BAR_STYLE:string = "w-full flex flex-row items-center pl-2 pb-2 pt-1 bg-transparent" ;
    public static readonly LOADING_STYLE:string = "mr-auto bg-gray-200 text-black p-3 rounded-lg max-w-[70%]";
    public static readonly ERROR_STYLE:string = "mr-auto bg-red-200 text-red-800 p-3 rounded-lg max-w-[70%]";
    public static readonly DATE_STYLE:string = "text-xs opacity-70";    
    public static readonly INPUT_COMS_STYLE:string = "flex-1 text-white text-md";
    
    

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