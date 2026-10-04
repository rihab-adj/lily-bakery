import { SOCIALS } from "../../config";
import { InstagramIcon, FacebookIcon, TikTokIcon, WhatsAppIcon } from "../Icons/Icons";
import "./SocialLinks.css";

const ICONS = { instagram: InstagramIcon, facebook: FacebookIcon, tiktok: TikTokIcon, whatsapp: WhatsAppIcon };

// Icônes de réseaux sociaux CLIQUABLES : chacune ouvre la page dans un nouvel onglet
function SocialLinks({ className = "" }) {
  return (
    <ul className={`social-links ${className}`}>
      {SOCIALS.map((s) => {
        const Icon = ICONS[s.id];
        return (
          <li key={s.id}>
            <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} (nouvel onglet)`} title={s.label} className={`social-${s.id}`}>
              <Icon width={20} height={20} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default SocialLinks;
