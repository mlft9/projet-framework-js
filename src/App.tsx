import React, { useEffect, useState } from "react";
import "./App.css";

type Tache = {
  id: string;
  titre: string;
  description: string;
  dateEcheance: string;
  terminee: boolean;
};

const CLE_STOCKAGE_TACHES = "todolist:taches";
const DUREE_ANIMATION_SUPPRESSION = 300;

const genererId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const initialiserListe = (): Array<Tache> => {
  if (typeof window === "undefined") {
    return [];
  }

  const donneesStockees = window.localStorage.getItem(CLE_STOCKAGE_TACHES);
  if (!donneesStockees) {
    return [];
  }

  try {
    const taches = JSON.parse(donneesStockees);
    if (!Array.isArray(taches)) {
      return [];
    }
    return taches
      .map((tache) => ({
        id: typeof tache.id === "string" ? tache.id : genererId(),
        titre: typeof tache.titre === "string" ? tache.titre : "",
        description:
          typeof tache.description === "string" ? tache.description : "",
        dateEcheance:
          typeof tache.dateEcheance === "string" ? tache.dateEcheance : "",
        terminee: Boolean(tache.terminee),
      }))
      .filter((tache) => tache.titre.trim().length > 0);
  } catch (error) {
    console.error("Impossible de lire les tâches stockées", error);
    return [];
  }
};

function App() {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [dateEcheance, setDateEcheance] = useState("");

  const [liste, setListe] = useState<Array<Tache>>(initialiserListe);
  const [tachesEnSuppression, setTachesEnSuppression] = useState<Array<string>>([]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(CLE_STOCKAGE_TACHES, JSON.stringify(liste));
  }, [liste]);

  function addTache(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const titreNettoye = titre.trim();
    if (!titreNettoye) {
      return;
    }
    const nouvelleTache: Tache = {
      id: genererId(),
      titre: titreNettoye,
      description,
      dateEcheance,
      terminee: false,
    };
    setListe((taches) => [...taches, nouvelleTache]);
    setTitre("");
    setDescription("");
    setDateEcheance("");
  }

  function basculerEtatTache(id: string) {
    setListe((taches) =>
      taches.map((tache) =>
        tache.id === id ? { ...tache, terminee: !tache.terminee } : tache
      )
    );
  }

  function supprimerTache(id: string) {
    setTachesEnSuppression((ids) => (ids.includes(id) ? ids : [...ids, id]));
    setTimeout(() => {
      setListe((taches) => taches.filter((tache) => tache.id !== id));
      setTachesEnSuppression((ids) => ids.filter((valeur) => valeur !== id));
    }, DUREE_ANIMATION_SUPPRESSION);
  }

  return (
    <div>
      <h1>Bonjour 👋</h1>
      <h2>Voici un formulaire de to-do list</h2>
      <div className="main-layout">
        <div className="form-col">
          <form action="#">
            <p>Titre de la tache</p>
            <input
              type="text"
              placeholder="Titre"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              required
            />
            <p>Description de la tache</p>
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <p>Date d'échéance</p>
            <input
              type="date"
              value={dateEcheance}
              onChange={(e) => setDateEcheance(e.target.value)}
            />
            {titre && (
              <button onClick={addTache}>Ajouter</button>
            )}
          </form>
        </div>
        <div className="taches-list">
          <h2>Liste des tâches</h2>
          <ul>
            {liste.map((tache) => (
              <li
                className={`tache-item ${
                  tache.terminee ? "tache-terminee" : ""
                } ${tachesEnSuppression.includes(tache.id) ? "tache-suppression" : ""}`}
                key={tache.id}
              >
                <div className="tache-en-tete">
                  <h3>{tache.titre}</h3>
                  <label className="statut-tache">
                    <input
                      type="checkbox"
                      checked={tache.terminee}
                      onChange={() => basculerEtatTache(tache.id)}
                    />
                    <span>{tache.terminee ? "Réalisée" : "À faire"}</span>
                  </label>
                </div>
                <p>Description : {tache.description}</p>
                <p className="date">Date d'échéance : {tache.dateEcheance}</p>
                <div className="actions-tache">
                  <button
                    type="button"
                    className="bouton-suppression"
                    onClick={() => supprimerTache(tache.id)}
                    aria-label={`Supprimer la tâche ${tache.titre}`}
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default App;
