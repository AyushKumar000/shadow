// CodeSnippet.js
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeSnippet = ({ code }) => {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(code)
            .then(() => {
                alert('Code copied to clipboard!');
            })
            .catch((error) => {
                console.error('Failed to copy code:', error);
            });
    };

    return (
        <div className="relative p-4 border border-gray-400 rounded-md bg-gray-800 shadow-md text-white">
            <SyntaxHighlighter language="javascript" style={solarizedlight}>
                {code}
            </SyntaxHighlighter>
            <button
                onClick={copyToClipboard}
                className="absolute top-2 right-2 bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600 transition duration-200"
            >
                Copy Code
            </button>
        </div>
    );
};

export default CodeSnippet;