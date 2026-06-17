import { Mail, Phone, User, X } from "lucide-react";
import { ASSET_BASE } from "../services/api.js";

export function ListingModal({ listing, onClose }) {
  if (!listing) return null;
  const image = listing.image_url ? `${ASSET_BASE}${listing.image_url}` : null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <section className="modal">
        <button className="icon-button close" onClick={onClose} aria-label="Close listing">
          <X size={20} />
        </button>
        <div className="modal-image">
          {image ? <img src={image} alt={listing.title} /> : <span>{listing.category}</span>}
        </div>
        <div className="modal-copy">
          <small className={`status ${listing.status}`}>{listing.status}</small>
          <h2>{listing.title}</h2>
          <strong>₹{Number(listing.price).toLocaleString("en-IN")}</strong>
          <p>{listing.description}</p>
          <div className="seller-box">
            <span><User size={17} />{listing.seller_name}</span>
            <a href={`mailto:${listing.seller_email}`}><Mail size={17} />{listing.seller_email}</a>
            {listing.seller_phone && <a href={`tel:${listing.seller_phone}`}><Phone size={17} />{listing.seller_phone}</a>}
          </div>
        </div>
      </section>
    </div>
  );
}
