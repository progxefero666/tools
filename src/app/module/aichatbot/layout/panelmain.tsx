//src\lib\arquitect\comp\panelmain.tsx

import { useEffect } from "react";
import PanelRight from "./panelrigth";
import { XAiChatInput } from "@/lib/xaicomp/chatinput";
import { ChatConfig } from "@/lib/ai/model/chatconfig";
import { IAnthropic } from "@/catalogs/anthropic/anthropic";
import { useChat } from "@/lib/ai/hook/usechat";
import { AiRoles } from "@/lib/ai/types/aitypes";


/**
 * Page Main Panel
 */
export interface PanelMainIfc {
    module_name: string;
    collection: string[];
}
const chatConfig: ChatConfig = new ChatConfig(IAnthropic.MOTOR_SONNET_35, 0.7, 1000);

export default function PanelMain({ module_name, collection }: PanelMainIfc) {
    const { messages, isLoading, error, sendMessage } = useChat(chatConfig);

    useEffect(() => { }, []);

    const onsubmit = (content: string) => {
        //alert("onsubmit:".concat(content));
        sendMessage(content);
    }


    return (
        <div className="w-full h-auto grid grid-cols-[80%_20%] ">

            {/*ai chatbot interfaca */}
            <div className="ai_chatbot_interface  flex flex-col px-2 h-screen">

                <div id="messages_area" className="flex-1 overflow-y-auto mt-2 mx-2 pb-4">
                    {messages.map(message => (
                        <div key={message.id} className={`mb-2 p-3 rounded-lg max-w-[70%] ${message.role === AiRoles.USER
                                ? "ml-auto bg-blue-500 text-white"
                                : "mr-auto bg-gray-200 text-black"
                            }`}>
                            <p>{message.content}</p>
                            <small className="text-xs opacity-70">
                                {message.timestamp.toLocaleTimeString()}
                            </small>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="mr-auto bg-gray-200 text-black p-3 rounded-lg max-w-[70%]">
                            <p>...</p>
                        </div>
                    )}
                    {error && (
                        <div className="mr-auto bg-red-200 text-red-800 p-3 rounded-lg max-w-[70%]">
                            <p>Error: {error}</p>
                        </div>
                    )}
                </div>

                <div className="flex flex-col flex-shrink-0 mx-2 mb-2">
                    <XAiChatInput
                        onsubmit={onsubmit}
                        placeholder="response to cloud" />
                </div>

            </div>

            <PanelRight />
        </div>
    )

}//end

/*
// USUARIO ESCRIBE
const userInput = "Hola, ¿cómo estás?";

// DIRECTO A ANTHROPIC API
{
  "role": "user",
  "content": "Hola, ¿cómo estás?"  // ← Texto tal como lo escribió
}    
*/