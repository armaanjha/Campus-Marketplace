import { useEffect, useMemo, useState } from "react";
import { ListingModal } from "./components/ListingModal.jsx";
import { Nav } from "./components/Nav.jsx";
import { AuthPage } from "./pages/AuthPage.jsx";
import { CreateListing } from "./pages/CreateListing.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { Home } from "./pages/Home.jsx";
import { useAuth } from "./hooks/useAuth.js";
import { api } from "./services/api.js";

export default function App() {
  const { user, loading, login, register, logout } = useAuth();
  const [view, setView] = useState("home");
  const [authMode, setAuthMode] = useState("login");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [listings, setListings] = useState([]);
  const [myListings, setMyListings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(null);
  const favoriteIds = useMemo(() => new Set(favorites.map((item) => item.id)), [favorites]);

  async function refresh() {
    const [listingData, favoriteData, mineData] = await Promise.all([
      api.listings({ search, category }),
      user ? api.favorites() : Promise.resolve({ favorites: [] }),
      user ? api.listings({ mine: "true" }) : Promise.resolve({ listings: [] })
    ]);
    setListings(listingData.listings);
    setFavorites(favoriteData.favorites);
    setMyListings(mineData.listings);
  }

  useEffect(() => {
    refresh().catch(console.error);
  }, [search, category, user?.id]);

  async function handleFavorite(listing) {
    if (!user) {
      setView("login");
      return;
    }
    if (favoriteIds.has(listing.id)) await api.deleteFavorite(listing.id);
    else await api.addFavorite(listing.id);
    await refresh();
  }

  async function handleCreate(formData) {
    if (editing) {
      await api.updateListing(editing.id, formData);
      setEditing(null);
      setView("dashboard");
    } else {
      await api.createListing(formData);
      setView("home");
    }
    await refresh();
  }

  async function markSold(listing) {
    const formData = new FormData();
    formData.append("status", "sold");
    await api.updateListing(listing.id, formData);
    await refresh();
  }

  async function deleteListing(id) {
    await api.deleteListing(id);
    await refresh();
  }

  if (loading) return <div className="boot">Loading Campus Market...</div>;

  return (
    <>
      <Nav user={user} view={view} setView={setView} onLogout={async () => { await logout(); setView("home"); }} />
      {view === "home" && (
        <Home
          listings={listings}
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          onOpen={setSelected}
          onFavorite={handleFavorite}
          favoriteIds={favoriteIds}
        />
      )}
      {view === "login" && (
        <AuthPage
          mode={authMode}
          onMode={setAuthMode}
          login={async (payload) => { await login(payload); setView("home"); }}
          register={async (payload) => { await register(payload); setView("home"); }}
        />
      )}
      {view === "create" && user && (
        <CreateListing onSubmit={handleCreate} editing={editing} onCancel={() => { setEditing(null); setView("dashboard"); }} />
      )}
      {view === "dashboard" && user && (
        <Dashboard
          myListings={myListings}
          favorites={favorites}
          onEdit={(listing) => { setEditing(listing); setView("create"); }}
          onDelete={deleteListing}
          onSold={markSold}
          onOpen={setSelected}
          onFavorite={handleFavorite}
          favoriteIds={favoriteIds}
        />
      )}
      <ListingModal listing={selected} onClose={() => setSelected(null)} />
    </>
  );
}
