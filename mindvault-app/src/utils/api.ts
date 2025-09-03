export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`http://localhost:8080/api${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  if (res.status === 204) {
    return null;
  }

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export async function apiAIFetch(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`http://localhost:5000/${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  if (res.status === 204) return null;

  return await res.json();
}