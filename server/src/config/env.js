import dotenv from 'dotenv';

dotenv.config();

const required = ['GEMINI_API_KEY', 'GEMINI_MODEL_NAME'];

const missing = required.filter((key) => !process.env[key]);
if (missing.length) {
  // In production you may want to fail fast; here we just log a warning.
  // eslint-disable-next-line no-console
  console.warn(
    `Warning: Missing environment variables: ${missing.join(
      ', '
    )}. Gemini features may not work correctly.`
  );
}

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  geminiModelName: process.env.GEMINI_MODEL_NAME || 'gemini-1.5-flash'
};


