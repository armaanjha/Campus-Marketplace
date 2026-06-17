import { CheckCircle2, Pencil, Trash2 } from "lucide-react";
import { ListingCard } from "../components/ListingCard.jsx";

export function Dashboard({ myListings, favorites, onEdit, onDelete, onSold, onOpen, onFavorite, favoriteIds }) {
  return (
    <main className="dashboard">
      <section>
        <div className="section-heading">
          <h1>My Listings</h1>
          <span>{myListings.length} posted</span>
        </div>
        <div className="table-panel">
          {myListings.map((listing) => (
            <div className="listing-row" key={listing.id}>
              <button onClick={() => onOpen(listing)}>{listing.title}</button>
              <span>₹{Number(listing.price).toLocaleString("en-IN")}</span>
              <small className={`status ${listing.status}`}>{listing.status}</small>
              <div className="row-actions">
                <button className="icon-button" onClick={() => onEdit(listing)} title="Edit"><Pencil size={17} /></button>
                <button className="icon-button" onClick={() => onSold(listing)} title="Mark sold"><CheckCircle2 size={17} /></button>
                <button className="icon-button danger" onClick={() => onDelete(listing.id)} title="Delete"><Trash2 size={17} /></button>
              </div>
            </div>
          ))}
          {!myListings.length && <p className="empty">You have not posted anything yet.</p>}
        </div>
      </section>

      <section>
        <div className="section-heading">
          <h2>Favorites</h2>
          <span>{favorites.length} saved</span>
        </div>
        <div className="listing-grid compact">
          {favorites.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              onOpen={onOpen}
              onFavorite={onFavorite}
              favoriteActive={favoriteIds.has(listing.id)}
            />
          ))}
          {!favorites.length && <p className="empty">Saved items will appear here.</p>}
        </div>
      </section>
    </main>
  );
}
