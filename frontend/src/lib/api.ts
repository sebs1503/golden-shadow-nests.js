const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

type Query = Record<string, string | number | boolean | undefined>;

function qs(query?: Query) {
  if (!query) return '';
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(query)) {
    if (v === undefined || v === null) continue;
    p.append(k, String(v));
  }
  const s = p.toString();
  return s ? `?${s}` : '';
}

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(init?.headers||{}) },
    ...init,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${res.statusText}: ${text}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  families: {
    list: (params?: Query) => http<any[]>(`/families${qs(params)}`),
    get: (id: string) => http<any>(`/families/${id}`),
    create: (data: any) => http<any>('/families', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) => http<any>(`/families/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    remove: (id: string) => http<{deleted: boolean}>(`/families/${id}`, { method: 'DELETE' }),
  },
  methods: {
    list: (params?: Query) => http<any[]>(`/murder-methods${qs(params)}`),
    get: (id: string) => http<any>(`/murder-methods/${id}`),
    create: (data: any) => http<any>('/murder-methods', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) => http<any>(`/murder-methods/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    remove: (id: string) => http<{deleted: boolean}>(`/murder-methods/${id}`, { method: 'DELETE' }),
  },
  victims: {
    list: (params?: Query) => http<any[]>(`/victims${qs(params)}`),
    get: (id: string) => http<any>(`/victims/${id}`),
    create: (data: any) => http<any>('/victims', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) => http<any>(`/victims/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    remove: (id: string) => http<{deleted: boolean}>(`/victims/${id}`, { method: 'DELETE' }),
  },
  cases: {
    list: (params?: Query) => http<any[]>(`/cases${qs(params)}`),
    get: (id: string, params?: Query) => http<any>(`/cases/${id}${qs(params)}`),
    create: (data: any) => http<any>('/cases', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) => http<any>(`/cases/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    remove: (id: string) => http<{deleted: boolean}>(`/cases/${id}`, { method: 'DELETE' }),
  },
};
