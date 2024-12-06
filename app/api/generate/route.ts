// import { NextRequest } from "next/server";
// import { openai } from "@ai-sdk/openai";
// import { streamText } from "ai";
//
// const model = openai("gpt-4-turbo");
//
// export const runtime = "edge";
//
// export async function POST(req: NextRequest) {
//   const { prompt } = await req.json();
//
//   const result = await streamText({
//     model,
//     messages: [
//       {
//         role: "system",
//         content:
//           "You are an AI assistant that generates React code and style using tailwind. Provide only the code for a single file named 'App.js'. Do not include any markdown formatting, comments, or explanations. The code should be complete and ready to run in a React environment.",
//       },
//       {
//         role: "user",
//         content: prompt,
//       },
//     ],
//   });
//
//   return result.toDataStreamResponse();
// }

import Together from "together-ai";

const together = new Together();

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const stream = together.chat.completions.stream({
    model: "meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo",
    messages: [
      {
        role: "system",
        content:
          "You are an AI assistant that generates React code and style using tailwind. Provide only the code for a single file named 'App.js'. Do not include any markdown formatting, ```jsx , comments, or explanations. The code should be complete and ready to run in a React environment.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    stream: true,
  });

  return new Response(stream.toReadableStream());
}
