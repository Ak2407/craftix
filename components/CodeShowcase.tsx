import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
  SandpackCodeEditor,
} from "@codesandbox/sandpack-react";

const CodeShowcase = () => (
  <SandpackProvider template="react-ts">
    <SandpackLayout className="h-[500px]">
      <SandpackCodeEditor
        showTabs
        showLineNumbers
        showInlineErrors
        wrapContent
        closableTabs
      />
      <SandpackPreview showOpenInCodeSandbox={false} />
    </SandpackLayout>
  </SandpackProvider>
);

export default CodeShowcase;
