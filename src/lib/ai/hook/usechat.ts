//src\lib\ai\hook\usechat.ts

import { useState } from "react";
import { ChatState } from "../interface/chatstate";
import { ChatConfig } from "../model/chatconfig";
import Anthropic from "@anthropic-ai/sdk";
import { Message } from "../interface/message";
import { AiRoles } from "../types/aitypes";

/*
export const defaultConfig: ChatConfig 
    = new ChatConfig(IAnthropic.MOTOR_SONNET_3,0.7,1000);
*/
export function useChat(api_config: ChatConfig) {

    const [chatState, setChatState] = useState<ChatState>({
        messages: [],
        isLoading: false,
        error: null,
        config: api_config
    });

    const sendMessage = async (content: string) => {

        // 1. INMEDIATO: Crear objeto mensaje usuario
        //............................................................
        const userMessage: Message = {
            id: crypto.randomUUID(),
            content: content,
            role: AiRoles.USER,
            timestamp: new Date()
        };

        setChatState(prev => ({
            ...prev,
            messages: [...prev.messages, userMessage],
            isLoading: true
        }));

        // 2-3. Llamar API (async)
        //............................................................
        // 2. Llamar API (async)
        try {
            const response = await fetch("/api/ai/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: api_config.model,
                    max_tokens: api_config.maxTokens,
                    messages: [...chatState.messages, userMessage].map(msg => ({
                        role: msg.role,
                        content: msg.content
                    }))
                })
            });

            const data = await response.json();

            // 3. Añadir respuesta IA cuando llegue
            const assistantMessage: Message = {
                id: crypto.randomUUID(),
                content: data.content,
                role: AiRoles.ASSISTANT,
                timestamp: new Date()
            };

            setChatState(prev => ({
                ...prev,
                messages: [...prev.messages, assistantMessage],
                isLoading: false
            }));

        } catch (error) {
            console.error("API Error:", error);
            setChatState(prev => ({
                ...prev,
                isLoading: false,
                error: "Failed to send message"
            }));
        }

    };
    return {
        messages: chatState.messages,
        isLoading: chatState.isLoading,
        error: chatState.error,
        sendMessage
    };

}//end