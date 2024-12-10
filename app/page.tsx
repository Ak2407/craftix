"use client";

import { useEffect, useState } from "react";
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
  const [hydrated, setHydrated] = useState(false);

  const [key, setKey] = useState(0); // To trigger Sandpack reload
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return <div>Loading...</div>;
  }

  async function generateCode(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setCode(""); // Clear existing code
    const res = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    });

    const runner = ChatCompletionStream.fromReadableStream(res.body);
    runner.on("content", (delta) => setCode((text) => text + delta));
    runner.on("end", () => {
      setLoading(false);
      setKey((prevKey) => prevKey + 1); // Increment key to reload
    });
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold ">Craftix </h1>
      <p className="mb-6 text-base text-gray-600">
        Your Personal AI Coding Assistant. Tell it what you want and it will
        generate the code for you.
      </p>
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
        key={key} // Add key to trigger re-render
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
          {loading ? (
            <div className="flex justify-center items-center h-full w-full p-4">
              <h1>
                Code is being Generated Please Do not close or refresh the page
              </h1>
            </div>
          ) : (
            <SandpackPreview style={{ height: 700 }} />
          )}
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}
