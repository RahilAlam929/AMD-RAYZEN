import { generateText } from '../services/geminiClient.js';

export async function generateIdea(req, res, next) {
  try {
    const { prompt } = req.body || {};

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Prompt is required and must be a string.' });
    }

    const result = await generateText({ prompt });

    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
}


