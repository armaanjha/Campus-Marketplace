import { useEffect, useState } from "react";
import { api } from "../services/api.js";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.me()
      .then((data) => setUser(data.user))
      .finally(() => setLoading(false));
  }, []);

  async function login(payload) {
    const data = await api.login(payload);
    setUser(data.user);
  }

  async function register(payload) {
    const data = await api.register(payload);
    setUser(data.user);
  }

  async function logout() {
    await api.logout();
    setUser(null);
  }

  return { user, loading, login, register, logout };
}
