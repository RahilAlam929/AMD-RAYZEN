## AI for Social Good – Full-Stack Gemini Chatbot

A modern full-stack starter that lets you build AI-driven social impact experiences using a React frontend, a Node.js/Express backend, and Google Gemini for intelligent responses.

The project ships with a production-ready folder structure, environment variable support, and a clean, responsive chatbot UI.

---

### Features

- **AI for Social Good focus**: Out of the box, you can prototype assistants for climate action, education, health, civic engagement, and more.
- **Modern chatbot UI**: Responsive React interface with chat bubbles, typing indicator, and mobile-friendly layout.
- **Secure AI access**: Backend-only integration with Google Gemini (no API keys in the browser).
- **REST & SDK examples**:
  - `/chat` uses Gemini via the REST API and `axios`.
  - `/api/ai/generate` uses the official `@google/generative-ai` Node SDK.
- **Clean architecture**:
  - `client/` for the React app.
  - `server/` for the Express API, routes, controllers, services, and config.
- **Environment-driven config**: All sensitive values (e.g., `GEMINI_API_KEY`) are taken from `.env`.

---

### Tech Stack

- **Frontend**
  - React 18
  - Vite
  - Custom CSS (no UI framework lock-in)

- **Backend**
  - Node.js + Express
  - `cors`, `dotenv`, `axios`
  - `@google/generative-ai` for Gemini SDK integration

- **AI**
  - Google Gemini API (via REST and the official Node SDK)

---

### Project Structure

```text
.
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── App.jsx         # Chat UI
│   │   ├── main.jsx        # React entry
│   │   ├── styles.css      # Global/chat styles
│   │   └── services/       # API helpers (optional)
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/                 # Node.js + Express backend
│   ├── src/
│   │   ├── config/
│   │   │   └── env.js      # dotenv + config wrapper
│   │   ├── controllers/
│   │   │   └── aiController.js
│   │   ├── middleware/
│   │   │   └── errorHandler.js
│   │   ├── routes/
│   │   │   └── aiRoutes.js
│   │   ├── services/
│   │   │   └── geminiClient.js
│   │   └── server.js       # Express app entry, `/chat` endpoint
│   └── package.json
├── env.example             # Example environment variables
└── README.md
```

---

### Prerequisites

- Node.js **18+** and npm
- A **Google Gemini API key**

---

### Environment Variables & Gemini API Key

1. **Create an env file for the backend**

   From the project root:

   ```bash
   cd server
   cp ../env.example .env   # or create .env manually
   ```

   Edit `server/.env` and set:

   ```env
   PORT=5000
   NODE_ENV=development
   GEMINI_API_KEY=your_real_gemini_api_key_here
   GEMINI_MODEL_NAME=gemini-1.5-flash
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

2. **Keep secrets out of Git**

   - Never commit `.env` files to your repository.
   - Ensure your `.gitignore` contains:

     ```gitignore
     .env
     server/.env
     ```

3. **How the key is used**

   - The backend reads `GEMINI_API_KEY` in `server/src/config/env.js`.
   - The `/chat` route in `server/src/server.js` calls the Gemini REST API using this key.
   - The SDK-based service `server/src/services/geminiClient.js` also uses `GEMINI_API_KEY` and `GEMINI_MODEL_NAME`.
   - The frontend **never** sees or uses the raw API key.

---

### Installation

Clone your repository (or copy this project), then install dependencies for both backend and frontend:

```bash
cd server
npm install

cd ../client
npm install
```

---

### Running the App (Development)

#### 1. Start the backend (Express)

```bash
cd server
npm run dev
```

- Starts Express on `http://localhost:5000`.
- Endpoints:
  - `GET /health` – health check.
  - `POST /chat` – main chat endpoint using Gemini REST API.
  - `POST /api/ai/generate` – example Gemini SDK endpoint.

#### 2. Start the frontend (React + Vite)

```bash
cd client
npm start       # or: npm run dev
```

- Starts Vite on `http://localhost:5173` by default.
- The React app connects to the backend at `http://localhost:5000/chat`.

Open your browser at `http://localhost:5173` and start chatting.

---

### Production Build & Deployment

#### Build frontend

```bash
cd client
npm run build
```

- Outputs a production-ready build to `client/dist`.

#### Run backend in production mode

```bash
cd server
NODE_ENV=production npm run start
```

- Ensure environment variables are set in your hosting environment:
  - `PORT`
  - `NODE_ENV`
  - `GEMINI_API_KEY`
  - `GEMINI_MODEL_NAME`

#### Deployment suggestions

- **Static frontend + hosted API**
  - Host `client/dist` on Netlify, Vercel, GitHub Pages, or S3 + CloudFront.
  - Deploy the Express server to Render, Railway, Fly.io, or any Node-compatible VM/container platform.
  - Configure the frontend to call the deployed API URL (instead of `http://localhost:5000`).

- **Single-server deployment**
  - Serve the frontend build from the same Node/Express server by:
    - Copying `client/dist` into a static folder on the server, or
    - Adding `app.use(express.static(...))` in `server/src/server.js`.

- **Security best practices**
  - Keep `GEMINI_API_KEY` only on the server or in your deployment secrets manager.
  - Add basic rate limiting and input validation for public endpoints.
  - Consider authentication/authorization if deploying to a wider audience.

---

### Extending the Project

- Add user authentication and role-based access for different types of social impact tools.
- Persist chat history, projects, or ideas in a database (PostgreSQL, MongoDB, etc.).
- Add analytics to track which problem areas users care about most.
- Build dedicated flows (e.g., “design a campaign”, “draft a grant proposal”) on top of the Gemini endpoints.


