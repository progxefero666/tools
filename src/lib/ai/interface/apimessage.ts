//src\lib\ai\interface\apimessage.ts

import { AiRole } from "@/lib/ai/types/aitypes";

/**
 * interface ApiMessage
 */
export interface ApiMessage {
    role: AiRole;
    content: string;
}
