import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../config/env.js';

let client;

function getClient() {
  if (!client) {
    if (!config.geminiApiKey) {
      throw new Error('GEMINI_API_KEY is not configured');
    }
    client = new GoogleGenerativeAI(config.geminiApiKey);
  }
  return client;
}

export async function generateText({ prompt }) {
  const genAI = getClient();
  const model = genAI.getGenerativeModel({ model: config.geminiModelName });

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  return {
    text
  };
}


