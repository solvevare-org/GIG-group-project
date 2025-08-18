// Preferred backend base URL (override via Vite env VITE_API_BASE)
const FORCED_BASE = 'http://localhost:8001/';
const apiBase = FORCED_BASE.replace(/\/?$/, '');
const ENV_BASE = (import.meta as any)?.env?.VITE_API_BASE as string | undefined;

export function apiFetch(input: string, init?: RequestInit) {
  // If input is absolute (http/https), don't prefix
  const isAbsolute = /^https?:\/\//i.test(input);
  const base = (ENV_BASE ? ENV_BASE.replace(/\/?$/, '') : apiBase) || '';
  const path = isAbsolute ? input : `${base}${input.startsWith('/') ? '' : '/'}${input}`;
  return fetch(path, init);
}