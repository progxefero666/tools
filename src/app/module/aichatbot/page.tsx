//src\app\module\chatbot\page.tsx
"use client";

import { useEffect, useState } from "react";
import { useClientReady } from "@/lib/react/hook/useclientready";
import { useRouter } from "next/navigation";
import PanelLeft from "./layout/panelleft";
import AiChatBot from "./chatbot";
import { ChatConfig } from "@/lib/ai/model/chatconfig";
import { IAnthropic } from "@/catalogs/anthropic/anthropic";


const chatOptions:string[] = ["option 1","option 2","option 3"]
const chatConfig: ChatConfig = new ChatConfig(IAnthropic.MOTOR_SONNET_35, 0.7, 1000);

/**
 * AI ChatBot Page
 */
export default function AIChatBot() {

    const moduleName:string = "aichatbot";
    //const router = useRouter();  

    const executeOption = (option_name: string): void => { 
    }

    const clientReady = useClientReady();
    if (!clientReady) { return <div>Loading...</div>; }

    return (
        <div id="cont_root" className="w-full h-auto" >
            <div className="w-full h-auto bg-gray-900 grid grid-cols-[18%_82%]">                
                <PanelLeft selection={chatOptions[0]}
                           home={executeOption}
                           collection={chatOptions} />                
                <AiChatBot chatconfig={chatConfig}/>
            </div>

        </div>
    );

}//end


