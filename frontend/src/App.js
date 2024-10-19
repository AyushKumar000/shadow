// App.js
import React, { useState } from "react";
import axios from "axios";
import ChatUi from "./components/ChatUi";
import CodeSnippet from "./CodeSnippet"; // Import the new CodeSnippet component
import "./App.css"; // Import the CSS file for custom styles

function App() {
  const [messages, setMessages] = useState([
    {
      text: "Hi! I'm your code vulnerability assistant. How can I help?",
      sender: "bot",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

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
          const botResponse = {
            text: response.data.reply,
            sender: "bot",
            isCode: true,
          }; // Mark as code
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

  return (
    <div className="w-full h-[100vh]  master-bg">
      <ChatUi />
    </div>
    // <div className="flex justify-center items-center h-screen bg-[#111]">
    //   <div className="bg-gray-900 shadow-2xl rounded-lg w-11/12 max-w-5xl h-5/6 p-6 flex flex-col">
    //     {" "}
    //     {/* Full screen adjustments */}
    //     <div className="text-center text-2xl font-bold mb-4 text-indigo-300">
    //       Code Vulnerability Assistant
    //     </div>
    //     {/* Chat messages */}
    //     <div className="flex flex-col space-y-4 overflow-auto flex-grow p-4 bg-gray-700 rounded-lg scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-gray-600">
    //       {messages.map((message, index) => (
    //         <div
    //           key={index}
    //           className={`flex ${
    //             message.sender === "bot" ? "justify-start" : "justify-end"
    //           }`}
    //         >
    //           <div
    //             className={`px-4 py-2 rounded-xl max-w-3xl shadow-lg ${
    //               message.sender === "bot" ? "bg-indigo-500" : "bg-green-600"
    //             } border border-gray-400`} // Added border for elegance
    //           >
    //             {message.isCode ? (
    //               <CodeSnippet code={message.text} /> // Render the CodeSnippet component
    //             ) : (
    //               <span className="text-white">{message.text}</span>
    //             )}
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //     {/* Message input box */}
    //     <div className="mt-4 flex items-center space-x-2">
    //       <input
    //         type="text"
    //         className="w-full px-4 py-2 border border-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all duration-300 ease-in-out bg-gray-800 text-white"
    //         placeholder="Type a message..."
    //         value={inputMessage}
    //         onChange={(e) => setInputMessage(e.target.value)}
    //         onKeyPress={(e) => e.key === "Enter" && handleSend()}
    //       />
    //       <button
    //         className="bg-indigo-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-indigo-500 transition duration-300 ease-in-out"
    //         onClick={handleSend}
    //       >
    //         Send
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
}

export default App;
