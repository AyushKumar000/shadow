// CodeSnippet.js
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { monokai } from "react-syntax-highlighter/dist/esm/styles/hljs";

const CodeSnippet = ({ code }) => {
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        alert("Code copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy code:", error);
      });
  };

  return (
    <div className="">
      <SyntaxHighlighter
        language="javascript"
        style={dark}
        customStyle={{
          width: "40rem",
          fontSize: "0.8rem",
          backgroundColor: "#111",
          borderRadius: "5px",
          whiteSpace: "pre-wrap" /* Allows text to wrap */,
          wordWrap: "break-word",
          overflowWrap: "break-word",

          padding: "1rem",
        }}
      >
        {code}
      </SyntaxHighlighter>

      {/* <button
        onClick={copyToClipboard}
        className="absolute px-2 py-2 text-[0.8rem] text-white transition  rounded-lg bg-gray_bg top-0 right-0"
      >
        copy
      </button> */}
    </div>
  );
};

export default CodeSnippet;