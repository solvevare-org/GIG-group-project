// Normalize base URL: ensure scheme so calls don't become relative to the frontend origin
const rawBase = import.meta.env.VITE_API_URL || '';
const baseWithScheme = rawBase && !/^https?:\/\//i.test(rawBase) ? `http://${rawBase}` : rawBase;
const apiBase = baseWithScheme.replace(/\/?$/, '');

export function apiFetch(input: string, init?: RequestInit) {
  // If input is absolute (http/https), don't prefix
  const isAbsolute = /^https?:\/\//i.test(input);
  const path = isAbsolute ? input : `${apiBase}${input.startsWith('/') ? '' : '/'}${input}`;
  return fetch(path, init);
}
