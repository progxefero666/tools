//src\lib\xaicomp\chatinput.tsx

import { AppThemifyIcons } from "@/style/appthicons";
import { XButton } from "../../../lib/xuicomp/buttons/xbutton";
import { useRef } from "react";
import { AiChatBotStyle } from "./chatbot_style";


/**
 * JSX Component Search
 *   author: Xefero
 */
export interface XAiChatInputIfc {
    onsubmit: (value:string) => void;
    placeholder: string;
}

export function AiChatBotInput({onsubmit,placeholder}: XAiChatInputIfc) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleOnSubmit = (operationId?: string) => {
        if (textareaRef.current) {
            const value = textareaRef.current.value;
            if (value.trim()) {
                onsubmit(value);
                textareaRef.current.value = ""; 
            }
        }                
    }

    return (
        <div id="input_area" className={AiChatBotStyle.INPUT_AREA_STYLE}>
            
             {/* textarea */}
            <textarea ref={textareaRef}
                      className={AiChatBotStyle.TEXT_AREA_STYLE}
                      placeholder={placeholder}/>

            {/* input bar */}
            <div className={AiChatBotStyle.INPUT_BAR_STYLE}>
                <div className={AiChatBotStyle.INPUT_COMS_STYLE}>
                    future commands
                </div>
                <div>
                    <XButton
                        callback={handleOnSubmit}
                        operation={"input_submit"}
                        iconname={AppThemifyIcons.TI_ARROW_UP}
                        iconcolor="white" />
                </div>
            </div>
            
        </div>
    )

}//end comp

