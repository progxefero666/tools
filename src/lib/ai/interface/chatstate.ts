//src\lib\ai\interface\chatstate.ts

import { ChatConfig } from "../model/chatconfig";
import { Message } from "./message";

/**
 * interface ChatState
 */
export interface ChatState {
    messages: Message[];
    isLoading: boolean;
    error: string | null;
    config: ChatConfig;
}