//src\lib\arquitect\comp\panelmain.tsx

import { useEffect } from "react";
import PanelRight from "./layout/panelrigth";
import { AiChatBotInput } from "@/app/module/aichatbot/chatbot_input";
import { ChatConfig } from "@/lib/ai/model/chatconfig";
import { useChat } from "@/lib/ai/hook/usechat";
import { AiChatBotStyle } from "./chatbot_style";
import { AiChatBotConfig } from "./chatbot_cfg";


/**
 * Ai ChatBot jsx component
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
            <div className={AiChatBotStyle.CONTAINER_STYLE}>

                {/* messages area*/}
                <div className={AiChatBotStyle.MESSAGES_AREA_STYLE}>
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

                {/* chatbot input*/}
                <div className={ AiChatBotStyle.CONT_INPUT_AREA_STYLE}>
                    <AiChatBotInput onsubmit={onsubmit}
                                  placeholder={AiChatBotConfig.DEF_PLACE_HOLDER} />
                </div>

            </div>

            <PanelRight />

        </div>
    )

}//end
