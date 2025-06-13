//src\lib\ai\interface\apiresponse.ts

/**
 * interface ApiResponse
 */
export interface ApiResponse {
    content: Array<{ text: string }>;
    usage?: {
        input_tokens: number;
        output_tokens: number;
    };
}