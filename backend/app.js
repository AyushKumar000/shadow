require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const Groq = require("groq-sdk"); // Change to require to maintain consistency with the rest of the code

const app = express();
const PORT = process.env.PORT || 5000;
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Middleware
app.use(cors());
app.use(express.json()); // To handle JSON request bodies

// Example route to check server status
app.get('/', (req, res) => {
    try {
        res.json({ message: 'Backend is running!', status: 'success' });
    } catch (error) {
        console.error('Error in route:', error);
        res.status(500).json({ message: 'Internal server error', status: 'error' });
    }
});

// Route to handle code analysis and chat completion
app.post('/api/analyze', async (req, res) => {
    try {
        const { message } = req.body; // Extract message from request body
        if (!message) {
            return res.status(400).json({ error: 'No message provided' });
        }

        // Get chat completion from Groq API
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: message, // Use the user's input message
                },
            ],
            model: "llama3-8b-8192", // Specify your model here
        });

        // Respond back to frontend with the result of analysis
        res.json({ reply: chatCompletion.choices[0]?.message?.content || "No response from the model", status: 'success' });
    } catch (error) {
        console.error('Error during code analysis:', error);
        res.status(500).json({ message: 'Internal server error', status: 'error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});