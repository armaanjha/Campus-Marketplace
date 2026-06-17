import { useState } from "react";

export function AuthPage({ mode, onMode, login, register }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    setError("");
    try {
      if (mode === "register") await register(form);
      else await login({ email: form.email, password: form.password });
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="auth-shell">
      <form className="panel form-panel" onSubmit={submit}>
        <h1>{mode === "register" ? "Create Account" : "Login"}</h1>
        {mode === "register" && (
          <>
            <label>Name<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label>
            <label>Phone Number<input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} /></label>
          </>
        )}
        <label>Email<input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label>
        <label>Password<input type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} /></label>
        {error && <p className="error">{error}</p>}
        <button className="primary">{mode === "register" ? "Register" : "Login"}</button>
        <button type="button" className="text-button" onClick={() => onMode(mode === "register" ? "login" : "register")}>
          {mode === "register" ? "Already have an account? Login" : "Need an account? Register"}
        </button>
      </form>
    </main>
  );
}
