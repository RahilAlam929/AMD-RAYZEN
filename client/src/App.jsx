import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    // Add user message optimistically
    const userMessage = { id: Date.now(), role: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Request failed with status ${res.status}`);
      }

      const data = await res.json();
      const aiText = data.reply || 'No response from AI.';

      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        text: aiText
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setError(err.message || 'Something went wrong talking to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-badge-row">
          <span className="header-badge">AI for Social Good</span>
          <span className="header-tag">Hackathon-ready</span>
        </div>
        <h1>Gemini Chat Studio</h1>
        <p>Prototype impact-focused assistants with a clean, responsive chat experience.</p>
      </header>

      <main className="chat-shell">
        <section className="chat-window">
          {messages.length === 0 && (
            <div className="chat-empty">
              <p>Start the conversation by asking a question or describing what you need.</p>
            </div>
          )}

          <div className="chat-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`chat-message chat-message-${msg.role}`}
              >
                <div className="chat-avatar">
                  {msg.role === 'user' ? 'You' : 'AI'}
                </div>
                <div className="chat-bubble">
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="chat-message chat-message-assistant">
                <div className="chat-avatar">AI</div>
                <div className="chat-bubble typing-indicator">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
          </div>
        </section>

        <form className="chat-input-row" onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Ask anything…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <button type="submit" disabled={!input.trim() || loading}>
            {loading ? 'Sending…' : 'Send'}
          </button>
        </form>

        {error && <p className="error error-inline">{error}</p>}
      </main>

      <footer className="footer">
        <p>Prototype chatbot UI. Extend with history persistence, auth, and more.</p>
      </footer>
    </div>
  );
}

export default App;


