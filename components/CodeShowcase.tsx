import { Sandpack } from "@codesandbox/sandpack-react";

type CodeShowcaseProps = {
  code: string;
};

const CodeShowcase = ({ code }: CodeShowcaseProps) => (
  <Sandpack
    template="react"
    files={{
      "/App.js": code,
    }}
    options={{
      showNavigator: true,
      showTabs: true,
      showLineNumbers: true,
      autorun: true,
      editorHeight: 700,
      editorWidthPercentage: 60,
    }}
  />
);

export default CodeShowcase;
