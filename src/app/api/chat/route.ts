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

    // Format fields strictly to match expected literal string structures for the SDK
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

    // Request the stream from OpenRouter
    const stream = await openrouter.chat.send({
      chatRequest: {
        model: "openai/gpt-oss-120b:free",
        messages: formattedMessages,
        stream: true,
      }
    });

    let fullAIResponse = "";

    // Consume the stream internally on the server side
    for await (const chunk of stream) {
      const content = chunk.choices?.[0]?.delta?.content;
      if (content) {
        fullAIResponse += content;
      }

      // Log the reasoning tokens to your server terminal when they arrive
      if (chunk.usage && chunk.usage.reasoningTokens) {
        console.log(`\nReasoning tokens: ${chunk.usage.reasoningTokens}`);
      }
    }

    // Return everything as a standard JSON object that your frontend is waiting for
    return NextResponse.json({ reply: fullAIResponse });

  } catch (error: any) {
    console.error("OpenRouter Error Handler:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error occurred processing prompt payload." },
      { status: 500 }
    );
  }
}