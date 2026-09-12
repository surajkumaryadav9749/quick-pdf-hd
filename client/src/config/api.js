const LOCAL_BACKEND = /^(https?:\/\/)?(localhost|127\.0\.0\.1|0\.0\.0\.0)(:\d+)?$/i;

const normalize = (value) =>
  String(value || "")
    .trim()
    .replace(/\/+$/, "")
    .replace(/\/api$/i, "");

const developmentBase = () => {
  const raw = normalize(import.meta.env.VITE_API_URL);
  if (!raw || LOCAL_BACKEND.test(raw)) return "";
  return raw;
};

// Production always uses same-origin /api. Vercel rewrites that path to the
// Render Express server. Localhost and 127.0.0.1 are never used in production.
export const API_BASE = import.meta.env.PROD ? "" : developmentBase();

export const apiUrl = (path) => `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
