import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [dateEcheance, setDateEcheance] = useState("");

  const [liste, setListe] = useState<
    Array<{ titre: string; description: string; dateEcheance: string }>
  >([]);

  function addTache(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const nouvelleTache = { titre, description, dateEcheance };
    setListe([...liste, nouvelleTache]);
    console.log(JSON.stringify(nouvelleTache));
    setTitre("");
    setDescription("");
    setDateEcheance("");
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
              <li className="tache-item" key={index}>
                <h3>{tache.titre}</h3>
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
