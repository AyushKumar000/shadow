import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./App.css"; // Import the CSS file for custom styles
import LeftPanel from "./components/LeftPanel";
import { motion } from "framer-motion";
import SVG from "./Svg/SVG";
import right_arrow from "./Svg/right_arrow";
import { marked } from "marked";
import hljs from "highlight.js"; // Import highlight.js
import "highlight.js/styles/github-dark.css"; // Import the theme you want
import logo from "./Svg/logo";

function App() {
  const [messages, setMessages] = useState([
    {
      text: "Hi! I'm your code vulnerability assistant. How can I help?",
      sender: "bot",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  // Reference for the messages container to scroll to the bottom
  const messageEndRef = useRef(null);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Function to highlight code blocks
  useEffect(() => {
    // Highlight all code blocks after the messages are updated
    document.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block);
    });
  }, [messages]);

  // Function to send messages to the backend
  const handleSend = () => {
    if (inputMessage.trim() !== "") {
      const newMessages = [...messages, { text: inputMessage, sender: "user" }];
      setMessages(newMessages);
      setInputMessage("");

      // Send message to backend for analysis
      axios
        .post("http://localhost:5000/api/analyze", { message: inputMessage })
        .then((response) => {
          // Convert the response Markdown to HTML using marked
          const botResponse = {
            text: marked(response.data.reply), // Format using marked
            sender: "bot",
            isCode: true, // Mark as code for rendering
          };
          setMessages([...newMessages, botResponse]);
        })
        .catch((error) => {
          console.error("Error fetching the bot response:", error);
          const errorResponse = {
            text: "Sorry, I encountered an error. Please try again.",
            sender: "bot",
          };
          setMessages([...newMessages, errorResponse]);
        });
    }
  };

  function EpClickhandler(getString) {
    // Directly set inputMessage and handle sending the message
    const newMessages = [...messages, { text: getString, sender: "user" }];
    setMessages(newMessages);
    setInputMessage(getString);

    // Send message to backend for analysis
    axios
      .post("http://localhost:5000/api/analyze", { message: getString })
      .then((response) => {
        const botResponse = {
          text: marked(response.data.reply), // Format using marked
          sender: "bot",
          isCode: true, // Mark as code for rendering
        };
        setMessages([...newMessages, botResponse]);
      })
      .catch((error) => {
        console.error("Error fetching the bot response:", error);
        const errorResponse = {
          text: "Sorry, I encountered an error. Please try again.",
          sender: "bot",
        };
        setMessages([...newMessages, errorResponse]);
      });
    setInputMessage("");
  }

  return (
    <div className="overflow-hidden master-bg">
      <div className="flex max-w-7xl h-[100dvh] mx-auto">
        <LeftPanel EpClickhandler={EpClickhandler} />
        <div className="w-full py-4 pr-4">
          <div className="flex flex-col h-full max-w-5xl p-6 rounded-lg shadow-2xl bg-dark_bg ">
            <motion.div
              className="flex items-center justify-center space-x-2 cursor-grab"
              drag
              dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
            >
              <SVG svg={logo} className="w-8 h-8" />
              <h1 className="text-2xl font-bold tracking-tight text-white animated-bg">
                CWYRECK
              </h1>
            </motion.div>

            <div className="w-full  my-4 rounded-full animated" />

            <div className="flex flex-col flex-grow pr-3 space-y-4 overflow-auto rounded-lg scrollbar-thin overflow-x-hidden">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`flex ${
                    message.sender === "bot" ? "justify-start" : "justify-end"
                  }`}
                  initial={{
                    x: `${message.sender === "bot" ? "-100px" : "100px"}`,
                    opacity: 0,
                  }}
                  animate={{
                    x: 0,
                    opacity: 1,
                  }}
                >
                  <div
                    className={`px-3 py-2 message rounded-lg max-w-3xl ${
                      message.sender === "bot" ? "bot-message" : "user-message"
                    }`}
                  >
                    {message.isCode ? (
                      <div
                        className="px-3 py-2 text-sm font-light tracking-wider"
                        dangerouslySetInnerHTML={{ __html: message.text }} // Render HTML from Markdown
                      />
                    ) : (
                      <div className="text-sm font-light tracking-wider">
                        {message.text}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              {/* This element ensures the view scrolls to the bottom */}
              <div ref={messageEndRef} />
            </div>

            <div className="flex items-center mt-4 space-x-2">
              <motion.input
                type="text"
                className="w-full px-5 py-3 text-sm font-light text-white duration-100 rounded-lg bg-gray_bg focus:outline-none"
                placeholder="Type a message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                whileTap={{ scale: "0.96" }}
              />
              <button onClick={handleSend}>
                <div className="cursor-pointer">
                  <motion.div whileTap={{ scale: 0.8 }}>
                    <SVG svg={right_arrow} className="w-10 h-10" />
                  </motion.div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
