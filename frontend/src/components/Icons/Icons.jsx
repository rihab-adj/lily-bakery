// Toutes les icônes du site, dessinées en SVG (aucune image externe à charger)
const base = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
const solid = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true };

export const MenuIcon = (p) => <svg {...base} {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
export const CloseIcon = (p) => <svg {...base} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>;
export const SearchIcon = (p) => <svg {...base} {...p}><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" /></svg>;
export const CartIcon = (p) => <svg {...base} {...p}><path d="M3 4h2.5l2 11h10l2-8H7" /><circle cx="9.5" cy="19" r="1.3" /><circle cx="16.5" cy="19" r="1.3" /></svg>;
export const InfoIcon = (p) => <svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 11v5.5M12 7.8v.1" /></svg>;
export const PhoneIcon = (p) => <svg {...base} {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z" /></svg>;
export const MailIcon = (p) => <svg {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>;
export const PinIcon = (p) => <svg {...base} {...p}><path d="M12 21s7-6.2 7-11.5A7 7 0 005 9.5C5 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>;
export const ClockIcon = (p) => <svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
export const TruckIcon = (p) => <svg {...base} {...p}><path d="M2 6h11v10H2zM13 10h4l4 3v3h-8" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></svg>;
export const StoreIcon = (p) => <svg {...base} {...p}><path d="M4 9l1.5-5h13L20 9M4 9v11h16V9M4 9c0 1.7 1.3 3 2.7 3S9.3 10.7 9.3 9c0 1.7 1.3 3 2.7 3s2.7-1.3 2.7-3c0 1.7 1.3 3 2.7 3S20 10.7 20 9" /></svg>;
export const BoltIcon = (p) => <svg {...base} {...p}><path d="M13 3L5 14h6l-1 7 8-11h-6z" /></svg>;
export const HeartIcon = (p) => <svg {...base} {...p}><path d="M12 20s-7-4.4-7-10a4 4 0 017-2.5A4 4 0 0119 10c0 5.6-7 10-7 10z" /></svg>;
export const LeafIcon = (p) => <svg {...base} {...p}><path d="M5 19c0-9 5-14 15-14 0 10-5 15-14 15M5 19c2-4 5-7 9-9" /></svg>;
export const WheatIcon = (p) => <svg {...base} {...p}><path d="M12 21V8M12 8c-2-.5-3-2-3-4 2 .5 3 2 3 4zm0 0c2-.5 3-2 3-4-2 .5-3 2-3 4zm0 5c-2-.5-3-2-3-4m3 4c2-.5 3-2 3-4M4 4l16 16" /></svg>;
export const BrushIcon = (p) => <svg {...base} {...p}><path d="M4 20c2.5 0 4-1 4-3 0-1.5-1-2.5-2.5-2.5S3 16 3 17.5c0 1-.3 2.5 1 2.5zM8.5 14.5L19 4l1.5 1.5L10 16" /></svg>;
export const ChevronIcon = (p) => <svg {...base} {...p}><path d="M9 6l6 6-6 6" /></svg>;
export const ArrowUpIcon = (p) => <svg {...base} {...p}><path d="M12 19V5M5 12l7-7 7 7" /></svg>;
export const StarIcon = (p) => <svg {...solid} {...p}><path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8 6.6 19.7l1.1-6.1L3.2 9.4l6.1-.8z" /></svg>;

// Réseaux sociaux (logos simplifiés)
export const InstagramIcon = (p) => <svg {...base} {...p}><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17" cy="7" r=".6" fill="currentColor" /></svg>;
export const FacebookIcon = (p) => <svg {...solid} {...p}><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21z" /></svg>;
export const TikTokIcon = (p) => <svg {...solid} {...p}><path d="M16.6 3c.3 2.3 1.6 3.7 3.9 3.9v3a7 7 0 01-3.8-1.2v5.9a5.6 5.6 0 11-5.6-5.6c.3 0 .6 0 .9.1v3.1a2.6 2.6 0 101.7 2.4V3z" /></svg>;
export const WhatsAppIcon = (p) => <svg {...base} {...p}><path d="M3.5 20.5l1.2-4.3A8.5 8.5 0 1112 20.5a8.4 8.4 0 01-4.1-1.1z" /><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 .8c-1-.4-2-1.400-2.400-2.400l.8-1-1-2z" /></svg>;
