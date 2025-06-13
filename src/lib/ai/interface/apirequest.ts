//src\lib\ai\interface\apirequest.ts

import { ApiMessage } from "./apimessage";
import { Message } from "./message";

/**
 * interface ApiResponse
 */
export interface ApiRequest {
    model: string;
    max_tokens: number;
    messages: ApiMessage[];
}
