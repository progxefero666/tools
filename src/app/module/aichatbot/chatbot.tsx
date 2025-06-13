//src\lib\arquitect\comp\panelmain.tsx

import { useEffect } from "react";
import PanelRight from "./layout/panelrigth";
import { AiChatBotInput } from "@/app/module/aichatbot/chatbot_input";
import { ChatConfig } from "@/lib/ai/model/chatconfig";
import { IAnthropic } from "@/catalogs/anthropic/anthropic";
import { useChat } from "@/lib/ai/hook/usechat";
import { AiChatBotStyle } from "./chatbot_style";
import { AiChatBotConfig } from "./chatbot_cfg";


/**
 * Page Main Panel
 */
export interface PanelMainIfc {
    chatconfig: ChatConfig
}


export default function AiChatBot({ chatconfig }: PanelMainIfc) {
    const { messages, isLoading, error, sendMessage } = useChat(chatconfig);

    useEffect(() => { }, []);

    const onsubmit = (content: string) => {
        sendMessage(content);
    }

    return (
        <div className="w-full h-auto grid grid-cols-[80%_20%] ">

            {/*ai chatbot interface */}
            <div className="ai_chatbot_interface  flex flex-col px-2 h-screen">

                {/* messages area*/}
                <div className="flex-1 overflow-y-auto mt-2 mx-2 pb-4">
                    {messages.map(message => (
                        <div key={message.id} className={AiChatBotStyle.getMessageStyle(message.role)}  >
                            <p>{message.content}</p>
                            <small className={AiChatBotStyle.DATE_STYLE}>
                                {message.timestamp.toLocaleTimeString()}
                            </small>
                        </div>
                    ))}
                    {isLoading && (
                        <div className={AiChatBotStyle.LOADING_STYLE}>
                            <p>...</p>
                        </div>
                    )}
                    {error && (
                        <div className={AiChatBotStyle.ERROR_STYLE}>
                            <p>Error: {error}</p>
                        </div>
                    )}
                </div>

                {/* input area*/}
                <div className="flex flex-col flex-shrink-0 mx-2 mb-2">
                    <AiChatBotInput onsubmit={onsubmit}
                                  placeholder={AiChatBotConfig.DEF_PLACE_HOLDER} />
                </div>

            </div>

            <PanelRight />

        </div>
    )

}//end
