import { Search } from "lucide-react";
import { ListingCard } from "../components/ListingCard.jsx";

const categories = ["Books", "Electronics", "Cycles", "Hostel Items", "Calculator", "Lab Coats"];

export function Home({ listings, search, setSearch, category, setCategory, onOpen, onFavorite, favoriteIds }) {
  return (
    <main>
      <section className="hero-band">
        <div>
          <h1>Buy and sell inside your campus.</h1>
          <p>Find books, calculators, cycles, monitors, hostel items, and lab coats from students nearby.</p>
        </div>
        <label className="search-box">
          <Search size={19} />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search calculator, book, cycle..." />
        </label>
      </section>

      <section className="filters" aria-label="Categories">
        <button className={!category ? "selected" : ""} onClick={() => setCategory("")}>All</button>
        {categories.map((item) => (
          <button key={item} className={category === item ? "selected" : ""} onClick={() => setCategory(item)}>{item}</button>
        ))}
      </section>

      <section className="section-heading">
        <h2>Recent Listings</h2>
        <span>{listings.length} item{listings.length === 1 ? "" : "s"}</span>
      </section>

      <section className="listing-grid">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            listing={listing}
            onOpen={onOpen}
            onFavorite={onFavorite}
            favoriteActive={favoriteIds.has(listing.id)}
          />
        ))}
        {!listings.length && <p className="empty">No listings match your filters yet.</p>}
      </section>
    </main>
  );
}
