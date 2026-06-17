import { useState } from "react";

const categories = ["Books", "Electronics", "Cycles", "Hostel Items", "Calculator", "Lab Coats"];

export function CreateListing({ onSubmit, editing, onCancel }) {
  const [form, setForm] = useState({
    title: editing?.title || "",
    price: editing?.price || "",
    category: editing?.category || "Books",
    description: editing?.description || "",
    status: editing?.status || "available",
    image: null
  });
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    setError("");
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== "") formData.append(key, value);
    });
    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="auth-shell">
      <form className="panel form-panel wide" onSubmit={submit}>
        <h1>{editing ? "Edit Listing" : "Sell Item"}</h1>
        <label>Title<input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="Casio fx-991ES Plus" /></label>
        <label>Price<input type="number" min="0" value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} placeholder="800" /></label>
        <label>Category<select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Status<select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}><option>available</option><option>sold</option></select></label>
        <label>Description<textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Used for one semester." /></label>
        <label>Image<input type="file" accept="image/*" onChange={(event) => setForm({ ...form, image: event.target.files[0] })} /></label>
        {error && <p className="error">{error}</p>}
        <div className="form-actions">
          {editing && <button type="button" onClick={onCancel}>Cancel</button>}
          <button className="primary">{editing ? "Save Changes" : "Create Listing"}</button>
        </div>
      </form>
    </main>
  );
}
