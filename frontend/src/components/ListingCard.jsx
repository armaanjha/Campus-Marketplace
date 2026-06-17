import { Heart, IndianRupee, Tag } from "lucide-react";
import { ASSET_BASE } from "../services/api.js";

export function ListingCard({ listing, onOpen, onFavorite, favoriteActive }) {
  const image = listing.image_url ? `${ASSET_BASE}${listing.image_url}` : null;

  return (
    <article className="listing-card">
      <button className="listing-image" onClick={() => onOpen(listing)} aria-label={`Open ${listing.title}`}>
        {image ? <img src={image} alt={listing.title} /> : <span>{listing.category}</span>}
        <small className={`status ${listing.status}`}>{listing.status}</small>
      </button>
      <div className="listing-body">
        <div>
          <h3>{listing.title}</h3>
          <p>{listing.description}</p>
        </div>
        <div className="listing-meta">
          <span><IndianRupee size={16} />{Number(listing.price).toLocaleString("en-IN")}</span>
          <span><Tag size={16} />{listing.category}</span>
          <button className={favoriteActive ? "icon-button active" : "icon-button"} onClick={() => onFavorite(listing)}>
            <Heart size={18} fill={favoriteActive ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </article>
  );
}
