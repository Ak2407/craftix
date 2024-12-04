"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import InputBox from "@/components/InputBox";
import Heading from "@/components/Heading";
import CodeShowcase from "@/components/CodeShowcase";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [isAnimated, setIsAnimated] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setIsAnimated(true);
      setInputValue("");
    }
  };

  return (
    <div className="min-h-screen items-center p-8 gap-6 flex flex-col ">
      <motion.div
        initial={{ y: "40vh" }}
        animate={isAnimated ? { y: 0 } : { y: "40vh" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="text-center w-full "
      >
        <Heading creating={isAnimated} />
      </motion.div>

      {isAnimated && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className=" border-4 border-gray-200 w-full"
        >
          <CodeShowcase />
        </motion.div>
      )}

      <motion.div
        initial={{ y: "40vh" }}
        animate={isAnimated ? { y: 0 } : { y: "40vh" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full max-w-xl mx-auto "
      >
        <InputBox
          creating={isAnimated}
          inputValue={inputValue}
          handleInputChange={handleInputChange}
          handleKeyPress={handleKeyPress}
        />
      </motion.div>
    </div>
  );
}
