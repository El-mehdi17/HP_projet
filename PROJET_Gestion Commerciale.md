# Plateforme E-Commerce & Gestion Commerciale

Système complet de gestion commerciale avec espace client, dashboard admin et service après-vente.

---

## Stack Technique

| Couche             | Technologie                                     |
| ------------------ | ----------------------------------------------- |
| Backend            | Laravel (API REST), PHP, SQLite/MySQL           |
| Frontend Client    | React.js + Axios + Tailwind CSS (`HP_projet`) |
| Frontend Admin     | React.js + Axios (`my_user`)                  |
| Frontend Admin SAV | React.js + Axios (`my-react-app`)             |


---

## Structure du Projet

```
code-project1/
├── app/                        # Laravel backend
│   ├── Models/                 # Client, Produit, Commande, Fournisseur...
│   └── Http/Controllers/       # API REST controllers
├── database/migrations/        # Schéma de la base de données
├── routes/api.php              # Routes API
├── HP_projet/                  # Frontend client (React)
├── my_user/                    # Frontend admin produits (React)
└── my-react-app/               # Frontend admin SAV (React)
```

---

## Base de Données

### Tables principales

| Table                | Description                                                             |
| -------------------- | ----------------------------------------------------------------------- |
| `clients`          | Comptes clients (nom, email, téléphone, adresse, password)            |
| `produits`         | Catalogue produits (nom, description, prix, stock, images, fournisseur) |
| `fournisseurs`     | Fournisseurs (nom, email, téléphone, adresse)                         |
| `commandes`        | Commandes clients (id_client, statut)                                   |
| `commande_produit` | Pivot commande ↔ produit (quantité, prix)                             |
| `factures`         | Factures générées par commande (montant total)                       |
| `bon_livraisons`   | Bons de livraison (date, adresse, commande)                             |
| `livraisons`       | Livraisons (livreur, type, statut, téléphone)                         |
| `interventions`    | SAV technique (commande, technicien, description, statut)               |
| `techniciens`      | Techniciens (nom, spécialité, téléphone)                            |

### Statuts commande

`en_attente` → `en_preparation` → `expediee` → `livree`

### Statuts intervention SAV

`en_attente` → `en_cours` → `terminee`

---

## Installation

### Backend Laravel

```bash
cd code-project1
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan storage:link
php artisan serve
```

### Frontend Client (HP_projet)

```bash
cd HP_projet
npm install
# Créer .env :
# VITE_API_URL=http://127.0.0.1:8000/api
npm run dev
```

### Frontend Admin Produits (my_user)

```bash
cd my_user
npm install
# Créer .env :
# VITE_API_URL=http://127.0.0.1:8000/api
npm run dev
```

### Frontend Admin SAV (my-react-app)

```bash
cd my-react-app
npm install
npm run dev
```

---

## Routes API principales

| Méthode | Route                       | Description                 |
| -------- | --------------------------- | --------------------------- |
| POST     | `/api/clients`            | Inscription client          |
| POST     | `/api/clients/login`      | Connexion client            |
| GET/PUT  | `/api/clients/{id}`       | Profil client               |
| GET      | `/api/produits`           | Liste produits              |
| POST     | `/api/produits`           | Ajouter produit (admin)     |
| GET      | `/api/fournisseurs`       | Liste fournisseurs          |
| POST     | `/api/commandes`          | Créer commande             |
| GET      | `/api/commandes`          | Liste commandes             |
| POST     | `/api/commande-produits`  | Ajouter produit à commande |
| GET      | `/api/interventions`      | Liste interventions SAV     |
| POST     | `/api/interventions`      | Créer intervention SAV     |
| PUT      | `/api/interventions/{id}` | Mettre à jour statut SAV   |

---

## Fonctionnement

```
Client (HP_projet)              Laravel API                Admin (my-react-app)
       │                             │                             │
       ├─ Inscription ──────────► POST /clients                   │
       ├─ Connexion ────────────► POST /clients/login             │
       ├─ Voir produits ────────► GET /produits                   │
       ├─ Commander ────────────► POST /commandes                 │
       │                          POST /commande-produits         │
       ├─ Suivre commande ──────► GET /commandes                  │
       └─ SAV ──────────────────► POST /interventions ───────────► Voir + changer statut
```

---

## Fonctionnalités

### Espace Client (`HP_projet`)

- Inscription / Connexion avec persistance localStorage
- Catalogue produits avec recherche et affichage images
- Panier (ajout, quantité, suppression, total)
- Validation de commande → enregistrement en base
- Suivi des commandes avec badge statut
- Service après-vente (message lié à une commande)
- Modification du profil

### Dashboard Admin Produits (`my_user`)

- Ajout de produits (nom, prix, stock, images, fournisseur)
- Liste des produits depuis l'API
- Gestion des fournisseurs, techniciens, livreurs

### Dashboard Admin SAV (`my-react-app`)

- Affichage de tous les messages SAV clients
- Mise à jour du statut des interventions (en_attente / en_cours / terminee)
- Génération de bons de service PDF
