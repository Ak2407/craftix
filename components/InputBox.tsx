"use client";

import { Textarea } from "./ui/textarea";

type InputBoxProps = {
  inputValue: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
};

const InputBox = ({
  inputValue,
  handleInputChange,
  handleKeyPress,
}: InputBoxProps) => {
  return (
    <Textarea
      placeholder="Tell me what to build..."
      value={inputValue}
      onChange={handleInputChange}
      onKeyDown={handleKeyPress}
      className=" resize-none h-[150px] text-slate-600 text-base"
    />
  );
};

export default InputBox;
