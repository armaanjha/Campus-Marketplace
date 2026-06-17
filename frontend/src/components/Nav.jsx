import { Heart, LogOut, PackagePlus, Store, UserRound } from "lucide-react";

export function Nav({ user, view, setView, onLogout }) {
  return (
    <header className="topbar">
      <button className="brand" onClick={() => setView("home")}>
        <Store size={24} />
        <span>Campus Market</span>
      </button>
      <nav>
        <button className={view === "home" ? "nav-active" : ""} onClick={() => setView("home")}>Marketplace</button>
        {user && <button className={view === "create" ? "nav-active" : ""} onClick={() => setView("create")}><PackagePlus size={17} />Sell</button>}
        {user && <button className={view === "dashboard" ? "nav-active" : ""} onClick={() => setView("dashboard")}><Heart size={17} />Dashboard</button>}
        {!user && <button className={view === "login" ? "nav-active" : ""} onClick={() => setView("login")}><UserRound size={17} />Login</button>}
        {user && <button onClick={onLogout}><LogOut size={17} />Logout</button>}
      </nav>
    </header>
  );
}
