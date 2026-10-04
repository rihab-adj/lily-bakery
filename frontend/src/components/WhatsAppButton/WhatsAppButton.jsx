import { SHOP } from "../../config";
import { WhatsAppIcon } from "../Icons/Icons";
import "./WhatsAppButton.css";

// Bouton flottant : un clic ouvre une discussion WhatsApp avec la boutique
function WhatsAppButton() {
  const url = `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent("Bonjour Lily Bakery, j'ai une question sur un gâteau.")}`;
  return (
    <a className="whatsapp-float" href={url} target="_blank" rel="noopener noreferrer" aria-label="Nous écrire sur WhatsApp">
      <WhatsAppIcon width={26} height={26} />
    </a>
  );
}

export default WhatsAppButton;
