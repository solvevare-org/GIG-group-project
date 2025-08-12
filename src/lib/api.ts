const apiBase = (import.meta.env.VITE_API_URL || '').replace(/\/?$/, '');

export function apiFetch(input: string, init?: RequestInit) {
  // If input is absolute (http/https), don't prefix
  const isAbsolute = /^https?:\/\//i.test(input);
  const path = isAbsolute ? input : `${apiBase}${input.startsWith('/') ? '' : '/'}${input}`;
  return fetch(path, init);
}
