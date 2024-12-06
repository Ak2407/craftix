"use client";

import { useState } from "react";
import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatCompletionStream } from "together-ai/lib/ChatCompletionStream.mjs";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [code, setCode] = useState(`
// Welcome to the AI Code Generator!
// Enter a prompt to generate React code.

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
      <div className="bg-white text-gray-800 rounded-lg shadow-lg p-8 max-w-xl w-full">
        <h1 className="text-4xl font-bold mb-4 text-center">
          Welcome to the AI Code Generator!
        </h1>
        <p className="text-lg text-center mb-6">
          Enter a prompt to generate amazing React code and bring your ideas to life.
        </p>
        <div className="border-t border-gray-200 my-6"></div>
      </div>
    </div>
  );
}

export default App;
`);

  async function generateCode(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCode(""); // Clear existing code
    const res = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    });

    const runner = ChatCompletionStream.fromReadableStream(res.body);
    runner.on("content", (delta) => setCode((text) => text + delta));
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AI Code Generator</h1>
      <form onSubmit={generateCode} className="mb-4">
        <div className="flex gap-2">
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            type="text"
            name="prompt"
            placeholder="Describe the React component you want to build..."
            className="flex-grow"
          />
          <Button type="submit">Generate Code</Button>
        </div>
      </form>
      <SandpackProvider
        template="react"
        options={{
          externalResources: [
            "https://unpkg.com/@tailwindcss/ui/dist/tailwind-ui.min.css",
          ],
          autorun: true,
        }}
        files={{
          "/App.js": code,
          "/public/index.html": `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
          <div id="root"></div>
        </body>
      </html>
    `,
        }}
      >
        <SandpackLayout>
          <SandpackCodeEditor style={{ height: 700 }} />

          <SandpackPreview style={{ height: 700 }} />
        </SandpackLayout>
      </SandpackProvider>
      ;
    </div>
  );
}
