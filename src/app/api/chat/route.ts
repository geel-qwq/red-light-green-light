// app/api/chat/route.ts
import { NextResponse } from "next/server";
import { OpenRouter } from "@openrouter/sdk";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenRouter API Key is missing in your environment configuration variables." },
        { status: 500 }
      );
    }

    const openrouter = new OpenRouter({ apiKey });

    // Format fields strictly to match expected literal string structures
    const formattedMessages = [
      { 
        role: "system" as const, 
        content: "You are a helpful AI assistant integrated inside an interactive map-based telemetry dashboard panel." 
      },
      ...messages.map((m: any) => ({
        role: m.role === "user" ? ("user" as const) : ("assistant" as const),
        content: m.content || "",
      })),
    ];

    // Wrap payload parameters inside the explicit 'chatRequest' structural parent key
    const stream = await openrouter.chat.send({
      chatRequest: {
        model: "nex-agi/nex-n2-pro:free",
        messages: formattedMessages,
        stream: true,
      }
    });

    let aiResponseContent = "";

    // Iterate through the asynchronous stream chunks to build the full string response
    for await (const chunk of stream) {
      const content = chunk.choices?.[0]?.delta?.content;
      if (content) {
        aiResponseContent += content;
      }

      // FIX: Read reasoning tokens dynamically to bypass strict type-check collision
      if (chunk.usage) {
        const usageObj = chunk.usage as Record<string, any>;
        const tokens = usageObj.reasoning_tokens || usageObj.reasoningTokens;
        if (tokens) {
          console.log(`\n[AI Reasoning Tokens utilized]: ${tokens}`);
        }
      }
    }

    return NextResponse.json({ reply: aiResponseContent });

  } catch (error: any) {
    console.error("OpenRouter Stream Error Handler:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error occurred processing prompt payload." },
      { status: 500 }
    );
  }
}