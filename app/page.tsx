"use client";

import { useState } from "react";
import { useCompletion } from "ai/react";
import { Sandpack } from "@codesandbox/sandpack-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [code, setCode] = useState(`
// Welcome to the AI Code Generator!
// Enter a prompt to generate React code.

function App() {
  return (
    <div>
      <h1>Hello, AI-generated code!</h1>
      <p>Your code will appear here.</p>
    </div>
  );
}

export default App;
`);

  const { complete } = useCompletion({
    api: "/api/generate",
    onFinish: (prompt, completion) => {
      setCode(completion);
    },
    onMessage: (message) => {
      setCode((prevCode) => prevCode + message);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const prompt = formData.get("prompt") as string;
    setCode(""); // Clear existing code
    complete(prompt);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AI Code Generator</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <Input
            type="text"
            name="prompt"
            placeholder="Describe the React component you want to build..."
            className="flex-grow"
          />
          <Button type="submit">Generate Code</Button>
        </div>
      </form>
      <Sandpack
        template="react"
        files={{
          "/App.js": code,
        }}
        options={{
          showNavigator: false,
          showTabs: false,
          showLineNumbers: true,
          showInlineErrors: true,
          editorHeight: 700,
        }}
      />
    </div>
  );
}
