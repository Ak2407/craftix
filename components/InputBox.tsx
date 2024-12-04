"use client";

import { Textarea } from "./ui/textarea";

type InputBoxProps = {
  inputValue: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  creating: boolean;
};

const InputBox = ({
  inputValue,
  handleInputChange,
  handleKeyPress,
  creating,
}: InputBoxProps) => {
  const placeholder1 = "Tell me what to build...";
  const placeholder2 = "Additional iteration...";

  return (
    <Textarea
      placeholder={creating ? placeholder2 : placeholder1}
      value={inputValue}
      onChange={handleInputChange}
      onKeyDown={handleKeyPress}
      className=" resize-none h-[95px] text-slate-600 text-base bg-white w-full "
    />
  );
};

export default InputBox;
