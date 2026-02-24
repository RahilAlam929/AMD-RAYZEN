import express from 'express';
import cors from 'cors';
import axios from 'axios';

// Load configuration (including dotenv)
import { config } from './config/env.js';
import aiRoutes from './routes/aiRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Enable CORS so the frontend (running on a different port) can call this API
app.use(
  cors({
    origin: '*'
  })
);

// Parse incoming JSON request bodies
app.use(express.json());

// Simple health-check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Basic Gemini chat endpoint using axios and GEMINI_API_KEY from .env
app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body || {};

    // Validate input
    if (!message || typeof message !== 'string') {
      return res
        .status(400)
        .json({ error: 'Request body must include a "message" string.' });
    }

    // Make sure the API key is available
    if (!config.geminiApiKey) {
      return res
        .status(500)
        .json({ error: 'GEMINI_API_KEY is not set on the server.' });
    }

    // Build the Gemini REST API URL
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${config.geminiModelName}:generateContent?key=${config.geminiApiKey}`;

    // Call Gemini with the user message
    const response = await axios.post(url, {
      contents: [
        {
          parts: [{ text: message }]
        }
      ]
    });

    // Safely extract the text response
    const aiText =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      'No response from model.';

    // Send a simple JSON payload back to the frontend
    return res.json({ reply: aiText });
  } catch (error) {
    // Log details for debugging
    // eslint-disable-next-line no-console
    console.error('Error calling Gemini API:', error.response?.data || error.message);

    // Return a safe, generic error message to the client
    return res.status(500).json({
      error: 'Failed to get response from Gemini. Please try again later.'
    });
  }
});

// Existing AI routes (using the SDK-based implementation)
app.use('/api/ai', aiRoutes);

// Central error handler (for other routes/middleware)
app.use(errorHandler);

// Start the server
app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${config.port}`);
});

