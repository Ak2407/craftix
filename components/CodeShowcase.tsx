import { Sandpack } from "@codesandbox/sandpack-react";

const CodeShowcase = () => (
  <Sandpack
    options={{
      showLineNumbers: true,
      showTabs: true,
      showConsoleButton: true,
      editorHeight: 700,
    }}
  />
);

export default CodeShowcase;
