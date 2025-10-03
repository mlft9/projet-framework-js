# 🚀 Gestionnaire de tâches – React + TypeScript + Vite

Bienvenue dans ton gestionnaire de tâches nouvelle génération ! 🎉 Développée avec React 19, TypeScript et Vite, cette application combine performances, accessibilité et animations fluides pour t'aider à garder le contrôle sur ton quotidien.

## 🧭 Sommaire
- [Pourquoi tu vas l'adorer ?](#-pourquoi-tu-vas-ladorer-)
- [Prérequis](#-prérequis)
- [Installation express](#-installation-express)
- [Scripts npm disponibles](#-scripts-npm-disponibles)
- [Structure du projet](#-structure-du-projet)
- [Bonnes pratiques intégrées](#-bonnes-pratiques-intégrées)
- [Aller plus loin](#-aller-plus-loin)

## 🎯 Pourquoi tu vas l'adorer ?
- ✍️ **Création de tâches** via un formulaire clair (titre, description optionnelle, échéance).
- 🔁 **Gestion d'état dynamique** entre les colonnes « À faire » et « Terminées » avec compteurs animés.
- 💾 **Persistance locale** grâce à `localStorage` pour retrouver tes tâches à chaque visite.
- ✨ **Édition instantanée** directement depuis la liste avec validation intégrée.
- ✅ **Achèvement express** par simple case à cocher pour basculer une tâche.
- 🗑️ **Suppression sécurisée** avec modale de confirmation et transition de disparition.
- 🎞️ **Animations soignées** pour donner vie à chaque interaction.

## 🛠️ Prérequis
- [Node.js](https://nodejs.org/) **>= 18** (support officiel Vite 7 + React 19).
- [npm](https://www.npmjs.com/) (inclus avec Node.js).

## ⚡ Installation express
1. Installe les dépendances :
   ```bash
   npm install
   ```
2. Lance le serveur de développement (HMR inclus) :
   ```bash
   npm run dev
   ```
   L'application est accessible sur [http://localhost:5173](http://localhost:5173).

## 📦 Scripts npm disponibles
| Commande | Description |
| --- | --- |
| `npm run dev` | Démarre le serveur Vite en mode développement. |
| `npm run build` | Compile l'application pour la production (`dist/`). |
| `npm run preview` | Sert en local la version buildée. |
| `npm run lint` | Analyse le code avec ESLint et les règles React/TypeScript configurées. |

## 🗂️ Structure du projet
```
├── public/                # Fichiers statiques servis tels quels
├── src/
│   ├── App.tsx            # Composant principal (CRUD, animations, persistance)
│   ├── App.css            # Styles principaux et effets de transition
│   ├── main.tsx           # Point d'entrée React + création du root
│   ├── index.css          # Styles globaux et variables CSS
│   └── assets/            # Ressources additionnelles
├── package.json           # Dépendances et scripts npm
├── tsconfig*.json         # Configurations TypeScript (app & outils)
└── vite.config.ts         # Configuration Vite + plugin React
```

## ✅ Bonnes pratiques intégrées
- 🛡️ **TypeScript strict** (`Tache`) pour un typage robuste.
- ⚙️ **React Compiler** activé via `babel-plugin-react-compiler` pour un rendu optimisé.
- 🧰 **Stockage défensif** avec parsing JSON sécurisé pour éviter les données corrompues.
- ♿ **Accessibilité** soignée : modale ARIA-friendly, libellés explicites, focus géré.

## 📚 Aller plus loin
- 🎨 Personnalise la feuille de style (`src/App.css`) pour créer ta propre identité visuelle.
- 🌐 Connecte une API distante pour synchroniser les tâches entre plusieurs appareils.
- 🧪 Ajoute des tests (Vitest, Jest…) et automatise la validation fonctionnelle.

---

Prêt·e à cocher toutes tes tâches ? 💪 Cette base solide n'attend plus que tes idées pour évoluer vers une plateforme collaborative de gestion de projet.
