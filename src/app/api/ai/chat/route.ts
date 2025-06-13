//src\app\api\ai\chat\route.ts

import Anthropic from "@anthropic-ai/sdk";

/**
 * ia api end point
 *  path --> /ai/chat
 */
export async function POST(request: Request) {
    try {
        // 1. Parse request body
        const body = await request.json();
        const { model, max_tokens, messages } = body;

        // 2. call Anthropic API
        const anthropic = new Anthropic({
            apiKey: process.env.ANTHROPIC_API_KEY,
        });

        const response = await anthropic.messages.create({
            model: model,
            max_tokens: max_tokens,
            messages: messages
        });

        // 3. Return response - Verificar tipo
        const firstBlock = response.content[0];
        const content = firstBlock.type === "text" ? firstBlock.text : "No text response";

        return Response.json({
            content: content
        });

    } 
    catch (error) {
        console.error("API Error:", error);
        return Response.json(
            { error: "Failed to process request" },
            { status: 500 }
        );
    }

}//end function