# Lily Bakery — projet complet

## Démarrage en 1 clic (sans VS Code)
- **Windows** : double-clique sur `LANCER-LILY-BAKERY.bat` (2 fenêtres noires s'ouvrent, le site s'ouvre tout seul).
- **Mac** : double-clique sur `LANCER-LILY-BAKERY.command`.
- Astuce : clic droit sur le fichier > « Envoyer vers » > « Bureau (créer un raccourci) ».
- Le site est alors sur http://localhost:5173 (visible seulement sur ton ordinateur).
- Pour un VRAI lien accessible partout (téléphone, clients), il faut héberger le site : voir « Hébergement » plus bas.

## Photos
Elles sont dans `frontend/public/images/gateaux/`. Pour en changer une : remplace le fichier en gardant le même nom.
Nouveau gâteau : ajoute la photo dans ce dossier puis `image: "/images/gateaux/nom.jpg"` dans `backend/data/products.js`.


## Lancer le site (2 terminaux)

**Terminal 1 — backend**
```
cd backend
npm install
npm start
```
Tu dois voir : `✅ Serveur backend démarré sur http://localhost:5000`
Test : ouvre http://localhost:5000/api/health

**Terminal 2 — frontend**
```
cd frontend
npm install
npm run dev
```
Ouvre l'adresse affichée (souvent http://localhost:5173).

## Page patron (invisible pour les clients)
- Fais **5 clics rapides sur le logo « Lily Bakery »** : la page de connexion s'ouvre (ou va sur `/admin`).
- Après connexion, une icône 🔑 apparaît dans le header, **seulement sur ton navigateur**. Tu restes connecté 7 jours.
- Pour te déconnecter : bouton « Se déconnecter » dans la page patron.
- Mot de passe par défaut : `gateau2026`
- Pour le changer : `ADMIN_PASSWORD=monmotdepasse npm start` (dans `backend`)
  Sous Windows (PowerShell) : `$env:ADMIN_PASSWORD="monmotdepasse"; npm start`
- Si tu relances le backend, il faut te reconnecter (le site te le demande tout seul).

## Personnaliser le site (sans toucher au design)
- **Téléphone, e-mail, adresse, horaires, liens Instagram / Facebook / TikTok / WhatsApp, services de livraison** :
  tout est dans `frontend/src/config.js`. Remplace les liens d'exemple par ceux de TA boutique.
- **Textes de « À propos »** (histoire, équipe, chiffres, FAQ) : `frontend/src/pages/About/About.jsx` (textes d'exemple à adapter).
- **Vraies photos des gâteaux** : mets tes images dans `frontend/public/images/` puis ajoute dans `backend/data/products.js`
  le champ `image: "/images/red-velvet.jpg"` sur le produit. Sans photo, une illustration s'affiche automatiquement.
- **Recherche** : barre dans le header (suggestions en direct) ; accepte accents, majuscules, pluriels et mots en anglais.

## Si ça ne marche pas
- Le backend doit être lancé AVANT de passer commande.
- Après toute modification du backend : Ctrl + C puis `npm start` (il ne se relance pas tout seul).
- `EADDRINUSE` = un ancien serveur occupe déjà le port 5000 : ferme les autres terminaux.
- Regarde le terminal du backend : chaque requête et chaque erreur s'y affichent.

## Hébergement
Les commandes sont enregistrées dans `backend/data/orders.json`. Cela marche en local ou sur un
serveur classique (VPS), mais PAS sur les hébergeurs à disque temporaire (Vercel, Netlify Functions...).
Si le backend est hébergé, crée `frontend/.env` avec : `VITE_API_URL=https://adresse-de-ton-backend`
