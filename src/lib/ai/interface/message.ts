//src\lib\ai\interface\message.ts

import { AiRole } from "../types/aitypes";

/**
 * AiIfcMessage
 */
export interface Message {
    id: string;
    content: string;
    role: AiRole;
    timestamp: Date;
    error?: string;
    isLoading?: boolean;  
  
}//end 