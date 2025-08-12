const apiBase = import.meta.env.VITE_API_URL || '';

export function apiFetch(input: string, init?: RequestInit) {
  const url = apiBase ? `${apiBase}${input}` : input;
  return fetch(url, init);
}
