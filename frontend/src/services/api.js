const browserApiBase =
  typeof window === "undefined" ? "http://localhost:5000/api" : `${window.location.protocol}//${window.location.hostname}:5000/api`;

const API_BASE = import.meta.env.VITE_API_URL || browserApiBase;
export const ASSET_BASE = API_BASE.replace(/\/api$/, "");

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    ...options,
    headers: options.body instanceof FormData ? options.headers : {
      "Content-Type": "application/json",
      ...options.headers
    }
  });

  if (response.status === 204) return null;

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Request failed.");
  }
  return data;
}

export const api = {
  me: () => request("/me"),
  register: (payload) => request("/register", { method: "POST", body: JSON.stringify(payload) }),
  login: (payload) => request("/login", { method: "POST", body: JSON.stringify(payload) }),
  logout: () => request("/logout", { method: "POST" }),
  listings: (params = {}) => {
    const query = new URLSearchParams(
      Object.entries(params).filter(([, value]) => value !== undefined && value !== "")
    );
    return request(`/listings${query.size ? `?${query}` : ""}`);
  },
  listing: (id) => request(`/listings/${id}`),
  createListing: (formData) => request("/listings", { method: "POST", body: formData }),
  updateListing: (id, formData) => request(`/listings/${id}`, { method: "PUT", body: formData }),
  deleteListing: (id) => request(`/listings/${id}`, { method: "DELETE" }),
  favorites: () => request("/favorites"),
  addFavorite: (listingId) => request("/favorites", { method: "POST", body: JSON.stringify({ listingId }) }),
  deleteFavorite: (listingId) => request(`/favorites/${listingId}`, { method: "DELETE" })
};
