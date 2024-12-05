// import { NextRequest } from "next/server";
// import { openai } from "@ai-sdk/openai";
//
// import { streamText } from "ai";
//
// const model = openai("gpt-4o-mini");
//
// export async function POST(req: NextRequest) {
//   const { messages } = await req.json();
//
//   const result = await streamText({
//     system:
//       "You are a senior software engineer working at the top MNC firm. I will give you a prompt to create a application. Use your whole knowledge base to generate the code for the application in react code. Only give the code and nothing else text. This will be like your interview so give the most accurate and beautiful code for it. Good luck and if you pass I will give u 1 million dollar in tip. ",
//     model,
//     messages,
//   });
//
//   return result.toDataStreamResponse();
// }

import { NextRequest } from "next/server";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

const model = openai("gpt-4-turbo");

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  const result = await streamText({
    model,
    messages: [
      {
        role: "system",
        content:
          "You are an AI assistant that generates React code. Provide only the code for a single file named 'App.js'. Do not include any markdown formatting, comments, or explanations. The code should be complete and ready to run in a React environment.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return result.toDataStreamResponse();
}
