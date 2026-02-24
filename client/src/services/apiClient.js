const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

async function request(path, options = {}) {
  const url = `${baseUrl}${path}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  const res = await fetch(url, { ...options, headers });

  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;
    try {
      const data = await res.json();
      if (data && data.error) {
        message = data.error;
      }
    } catch (_) {
      // ignore JSON parse errors
    }
    throw new Error(message);
  }

  return res.json();
}

export default {
  post: (path, body) =>
    request(path, {
      method: 'POST',
      body: JSON.stringify(body)
    })
};


