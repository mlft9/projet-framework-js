import React, { useEffect, useState } from "react";
import "./App.css";

type Tache = {
  id: string;
  titre: string;
  description: string;
  dateEcheance: string;
  terminee: boolean;
};

function App() {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [dateEcheance, setDateEcheance] = useState("");

  const [liste, setListe] = useState<Array<Tache>>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    const donnees = window.localStorage.getItem("taches");
    if (!donnees) {
      return [];
    }

    try {
      const tachesStockees: Tache[] = JSON.parse(donnees);
      if (!Array.isArray(tachesStockees)) {
        return [];
      }
      return tachesStockees.map((tache) => ({
        ...tache,
        id: tache.id ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        terminee: Boolean(tache.terminee),
      }));
    } catch (error) {
      console.error("Impossible de lire les tâches en mémoire :", error);
      return [];
    }
  });
  const [enSuppression, setEnSuppression] = useState<Array<string>>([]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem("taches", JSON.stringify(liste));
  }, [liste]);

  function addTache(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const nouvelleTache: Tache = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      titre,
      description,
      dateEcheance,
      terminee: false,
    };
    setListe((taches) => [...taches, nouvelleTache]);
    console.log(JSON.stringify(nouvelleTache));
    setTitre("");
    setDescription("");
    setDateEcheance("");
  }

  function basculerEtatTache(index: number) {
    setListe((taches) =>
      taches.map((tache, position) =>
        position === index ? { ...tache, terminee: !tache.terminee } : tache
      )
    );
  }

  function supprimerTache(id: string) {
    setEnSuppression((ids) =>
      ids.includes(id) ? ids : [...ids, id]
    );
  }

  function gererFinSuppression(id: string) {
    setEnSuppression((ids) => {
      if (!ids.includes(id)) {
        return ids;
      }
      setListe((taches) => taches.filter((tache) => tache.id !== id));
      return ids.filter((valeur) => valeur !== id);
    });
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
            {liste.map((tache, index) => (
              <li
                className={`tache-item ${
                  tache.terminee ? "tache-terminee" : ""
                } ${enSuppression.includes(tache.id) ? "tache-suppression" : ""}`}
                key={tache.id}
                onAnimationEnd={() => gererFinSuppression(tache.id)}
              >
                <div className="tache-en-tete">
                  <h3>{tache.titre}</h3>
                  <label className="statut-tache">
                    <input
                      type="checkbox"
                      checked={tache.terminee}
                      onChange={() => basculerEtatTache(index)}
                    />
                    <span>{tache.terminee ? "Réalisée" : "À faire"}</span>
                  </label>
                  <button
                    type="button"
                    className="bouton-suppression"
                    onClick={() => supprimerTache(tache.id)}
                    aria-label={`Supprimer la tâche ${tache.titre}`}
                  >
                    Supprimer
                  </button>
                </div>
                <p>Description : {tache.description}</p>
                <p className="date">Date d'échéance : {tache.dateEcheance}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default App;
