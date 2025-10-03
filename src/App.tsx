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
  const [tacheASupprimer, setTacheASupprimer] = useState<Tache | null>(null);
  const [idEnEdition, setIdEnEdition] = useState<string | null>(null);
  const [titreEdition, setTitreEdition] = useState("");
  const [descriptionEdition, setDescriptionEdition] = useState("");
  const [dateEcheanceEdition, setDateEcheanceEdition] = useState("");

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
      titre: titre.trim(),
      description: description.trim(),
      dateEcheance,
      terminee: false,
    };
    setListe((taches) => [...taches, nouvelleTache]);
    console.log(JSON.stringify(nouvelleTache));
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
    const tache = liste.find((element) => element.id === id);
    if (!tache) {
      return;
    }
    setTacheASupprimer(tache);
  }

  function confirmerSuppressionTache() {
    if (!tacheASupprimer) {
      return;
    }
    const id = tacheASupprimer.id;
    setEnSuppression((ids) =>
      ids.includes(id) ? ids : [...ids, id]
    );
    setTacheASupprimer(null);
  }

  function annulerSuppressionTache() {
    setTacheASupprimer(null);
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

  function demarrerEdition(tache: Tache) {
    setIdEnEdition(tache.id);
    setTitreEdition(tache.titre);
    setDescriptionEdition(tache.description);
    setDateEcheanceEdition(tache.dateEcheance);
  }

  function annulerEdition() {
    setIdEnEdition(null);
    setTitreEdition("");
    setDescriptionEdition("");
    setDateEcheanceEdition("");
  }

  function enregistrerEdition(id: string) {
    if (!titreEdition.trim()) {
      return;
    }
    setListe((taches) =>
      taches.map((tache) =>
        tache.id === id
          ? {
              ...tache,
              titre: titreEdition.trim(),
              description: descriptionEdition.trim(),
              dateEcheance: dateEcheanceEdition,
            }
          : tache
      )
    );
    annulerEdition();
  }

  const nombreTerminees = liste.filter((tache) => tache.terminee).length;
  const nombreAFaire = liste.length - nombreTerminees;

  return (
    <div>
      <h1>Bonjour 👋</h1>
      <h2>Voici un formulaire de to-do list</h2>
      <div className="resume-taches">
        <div className="carte-resume">
          <span className="resume-titre">À faire</span>
          <span className="resume-valeur">{nombreAFaire}</span>
        </div>
        <div className="carte-resume">
          <span className="resume-titre">Terminées</span>
          <span className="resume-valeur">{nombreTerminees}</span>
        </div>
      </div>
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
                } ${enSuppression.includes(tache.id) ? "tache-suppression" : ""}`}
                key={tache.id}
                onAnimationEnd={() => gererFinSuppression(tache.id)}
              >
                {idEnEdition === tache.id ? (
                  <div className="edition-tache">
                    <div className="edition-entete">
                      <label className="statut-tache statut-edition">
                        <input
                          type="checkbox"
                          checked={tache.terminee}
                          onChange={() => basculerEtatTache(tache.id)}
                        />
                        <span>{tache.terminee ? "Réalisée" : "À faire"}</span>
                      </label>
                    </div>
                    <div className="edition-champs">
                      <label>
                        <span>Titre</span>
                        <input
                          type="text"
                          value={titreEdition}
                          onChange={(event) => setTitreEdition(event.target.value)}
                          required
                        />
                      </label>
                      <label>
                        <span>Description</span>
                        <input
                          type="text"
                          value={descriptionEdition}
                          onChange={(event) =>
                            setDescriptionEdition(event.target.value)
                          }
                        />
                      </label>
                      <label>
                        <span>Date d'échéance</span>
                        <input
                          type="date"
                          value={dateEcheanceEdition}
                          onChange={(event) =>
                            setDateEcheanceEdition(event.target.value)
                          }
                        />
                      </label>
                    </div>
                    <div className="edition-actions">
                      <button
                        type="button"
                        onClick={() => enregistrerEdition(tache.id)}
                        disabled={!titreEdition.trim()}
                      >
                        Enregistrer
                      </button>
                      <button
                        type="button"
                        className="bouton-secondaire"
                        onClick={annulerEdition}
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="tache-en-tete">
                      <h3>{tache.titre}</h3>
                      <div className="actions-tache">
                        <label className="statut-tache">
                          <input
                            type="checkbox"
                            checked={tache.terminee}
                            onChange={() => basculerEtatTache(tache.id)}
                          />
                          <span>{tache.terminee ? "Réalisée" : "À faire"}</span>
                        </label>
                        <button
                          type="button"
                          className="bouton-edition"
                          onClick={() => demarrerEdition(tache)}
                          aria-label={`Modifier la tâche ${tache.titre}`}
                        >
                          Modifier
                        </button>
                        <button
                          type="button"
                          className="bouton-suppression"
                          onClick={() => supprimerTache(tache.id)}
                          aria-label={`Supprimer la tâche ${tache.titre}`}
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                    <p>Description : {tache.description || "Aucune description"}</p>
                    <p className="date">
                      Date d'échéance : {tache.dateEcheance || "Non définie"}
                    </p>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    {tacheASupprimer && (
      <div
        className="modal-overlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-suppression-titre"
        onClick={annulerSuppressionTache}
      >
        <div
          className="modal-content"
          onClick={(event) => event.stopPropagation()}
        >
          <h3 id="confirmation-suppression-titre">Confirmer la suppression</h3>
          <p>
            Voulez-vous vraiment supprimer la tache{" "}
            <strong>{tacheASupprimer.titre || "sans titre"}</strong> ?
          </p>
          <div className="modal-actions">
            <button
              type="button"
              className="bouton-suppression"
              onClick={confirmerSuppressionTache}
            >
              Supprimer
            </button>
            <button
              type="button"
              className="bouton-secondaire"
              onClick={annulerSuppressionTache}
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    )}
    </div>

  );
}
export default App;
