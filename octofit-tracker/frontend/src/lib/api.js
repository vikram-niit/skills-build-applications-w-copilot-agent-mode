const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'http://localhost:8000/api';
};

const normalizeItems = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.results)) return payload.results;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

export async function fetchCollection(resource) {
  const response = await fetch(`${getApiBaseUrl()}/${resource}/`);

  if (!response.ok) {
    throw new Error(`Unable to fetch ${resource}`);
  }

  const payload = await response.json();
  return normalizeItems(payload);
}

export { getApiBaseUrl };
