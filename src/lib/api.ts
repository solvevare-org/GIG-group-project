// Hard-coded backend base URL
const FORCED_BASE = 'https://backend.vire-s.com'; 
const apiBase = FORCED_BASE.replace(/\/?$/, '');

// If the page is HTTPS and apiBase is HTTP, prefer same-origin (to be rewritten/proxied by the host)
function resolveBase(): string {
  try {
  if (typeof window !== 'undefined' && window.location?.protocol === 'https:' && /^http:\/\//i.test(apiBase)) {
      return '';
    }
  } catch {}
  return apiBase;
}

export function apiFetch(input: string, init?: RequestInit) {
  // If input is absolute (http/https), don't prefix
  const isAbsolute = /^https?:\/\//i.test(input);
  const base = resolveBase();
  // const base = 'http://localhost:8001'; // testing changes
  const path = isAbsolute ? input : `${base}${input.startsWith('/') ? '' : '/'}${input}`;
  return fetch(path, init);
}
