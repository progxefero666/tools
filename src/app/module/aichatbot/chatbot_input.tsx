//src\lib\xaicomp\chatinput.tsx

import { AppThemifyIcons } from "@/style/appthicons";
import { XButtonIcon } from "../../../lib/xuicomp/buttons/iconbutton";
import { useRef } from "react";


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

    const handleOnSubmit = (operationId: string) => {

        if (textareaRef.current) {
            const value = textareaRef.current.value;
            if (value.trim()) {
                onsubmit(value);
                textareaRef.current.value = ""; 
            }
        }                
    }

    return (
        <div id="input_area" className="w-full flex flex-col pl-3 pr-3 pt-3 rounded-lg border">
            
             {/* down bar */}
            <textarea ref={textareaRef}
                      className="textarea textarea-accent w-full arrow-up rounded-none border-transparent"
                      placeholder={placeholder}/>

            {/* down bar */}
            <div className="w-full flex flex-row items-center pl-2 pb-2 pt-1 bg-transparent" >
                <div className="flex-1 text-white text-md">
                    future commands
                </div>
                <div>
                    <XButtonIcon
                        callback={handleOnSubmit}
                        operation={"input_submit"}
                        iconname={AppThemifyIcons.TI_ARROW_UP}
                        iconcolor="white" />
                </div>
            </div>
            
        </div>
    )

}//end comp

