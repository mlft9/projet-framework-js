import React, { useState, useEffect } from "react";
import "./App.css"

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
      <div
        style={{
          backgroundColor: "#343434ff",
          padding: "20px",
          borderRadius: "8px",
          width: "250px",
        }}
      >
        <form
          action="#"
          style={{ display: "flex", flexDirection: "column", width: "200px" }}
        >
          <p>Titre de la tache</p>
          <input
            type="text"
            placeholder="Titre"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            required
          />{" "}
          <br />
          <p>Description de la tache</p>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />{" "}
          <br />
          <p>Date d'échéance</p>
          <input
            type="date"
            value={dateEcheance}
            onChange={(e) => setDateEcheance(e.target.value)}
          />{" "}
          <br />
          <button onClick={addTache}>Ajouter</button>
        </form>
      </div>
      <div>
        <h2>Liste des tâches</h2>
        <div>
          {liste.map((tache, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <h3>{tache.titre}</h3>
              <p>{tache.description}</p>
              <p>Date d'échéance: {tache.dateEcheance}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default App;
