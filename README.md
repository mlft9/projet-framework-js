# Gestionnaire de tâches – React + TypeScript + Vite

Ce dépôt contient une application de to-do list moderne développée avec React 19, TypeScript et Vite. L'interface met l'accent sur l'accessibilité, les animations CSS et la persistance locale des données pour offrir une expérience utilisateur fluide.

## Aperçu fonctionnel

- **Création de tâches** : formulaire guidé pour saisir un titre, une description optionnelle et une date d'échéance.
- **Gestion de l'état** : suivi des tâches « À faire » et « Terminées » avec compteurs animés.
- **Persistance locale** : stockage automatique des tâches dans `localStorage` afin de conserver la liste entre les sessions de navigation.
- **Modification en ligne** : édition d'une tâche existante avec validation du titre et mise à jour instantanée.
- **Achèvement rapide** : case à cocher pour marquer une tâche comme réalisée ou la remettre « À faire ».
- **Suppression sécurisée** : fenêtre modale de confirmation et animation de disparition avant retrait de la tâche.
- **Animations soignées** : transitions pour l'ajout et la suppression, effets de cartes flottantes et mise en valeur du contexte.

## Prérequis

- [Node.js](https://nodejs.org/) **>= 18** (recommandé pour profiter du support officiel de Vite 7 et de React 19).
- [npm](https://www.npmjs.com/) (fourni avec Node.js).

## Installation

1. Installer les dépendances du projet :
   ```bash
   npm install
   ```
2. Lancer le serveur de développement (avec rechargement à chaud) :
   ```bash
   npm run dev
   ```
   Par défaut, Vite démarre sur [http://localhost:5173](http://localhost:5173).

## Scripts npm disponibles

| Commande | Description |
| --- | --- |
| `npm run dev` | Démarre le serveur de développement Vite. |
| `npm run build` | Compile l'application en production (`dist/`) après vérification TypeScript. |
| `npm run preview` | Sert localement la version buildée. |
| `npm run lint` | Analyse le projet avec ESLint et les règles React/TypeScript configurées. |

## Structure du projet

```
├── public/                # Fichiers statiques servis tels quels
├── src/
│   ├── App.tsx            # Composant principal et logique métier (CRUD, animations, stockage)
│   ├── App.css            # Styles principaux et animations personnalisées
│   ├── main.tsx           # Point d'entrée React + création du root
│   ├── index.css          # Styles globaux et variables CSS
│   └── assets/            # Ressources supplémentaires (si nécessaire)
├── package.json           # Dépendances et scripts npm
├── tsconfig*.json         # Configuration TypeScript (app & outils)
└── vite.config.ts         # Configuration Vite et plugin React
```

## Qualité et bonnes pratiques

- **TypeScript strict** : typage fort (`Tache`) pour sécuriser la manipulation des données.
- **React Compiler** : activé par défaut via `babel-plugin-react-compiler` pour optimiser le rendu.
- **Stockage défensif** : parsing JSON encapsulé avec gestion des erreurs pour éviter les données corrompues.
- **Accessibilité** : modale avec attributs ARIA, libellés explicites et gestion du focus via React.

## Aller plus loin

- Personnaliser la feuille de style (`src/App.css`) pour ajuster la charte graphique.
- Connecter une API distante en remplaçant la persistance locale par des appels réseau.
- Ajouter des tests (par exemple avec Vitest ou Jest) afin d'automatiser la validation fonctionnelle.

---

Ce projet peut servir de base pour une application de gestion personnelle ou être enrichi pour couvrir des usages collaboratifs.
