import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-row justify-center items-center gap-4 p-4 text-sm text-gray-700 ">
      <a
        href="https://www.akshit.app/"
        target="_blank"
        className="hover:opacity-80"
      >
        Portfolio
      </a>
      <div>|</div>
      <a
        href="https://x.com/DevAxit"
        target="_blank"
        className="hover:opacity-80"
      >
        Twitter
      </a>
      <div>|</div>
      <a
        href="https://github.com/Ak2407"
        target="_blank"
        className="hover:opacity-80"
      >
        Github
      </a>
    </div>
  );
};

export default Footer;
