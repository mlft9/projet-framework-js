import type { MouseEvent } from "react";

type FormulaireTacheProps = {
  titre: string;
  description: string;
  dateEcheance: string;
  onTitreChange: (valeur: string) => void;
  onDescriptionChange: (valeur: string) => void;
  onDateEcheanceChange: (valeur: string) => void;
  onAjouter: (event: MouseEvent<HTMLButtonElement>) => void;
};

export function FormulaireTache({
  titre,
  description,
  dateEcheance,
  onTitreChange,
  onDescriptionChange,
  onDateEcheanceChange,
  onAjouter,
}: FormulaireTacheProps) {
  return (
    <div className="form-col bloc-animable">
      <form action="#">
        <p>Titre de la tache</p>
        <input
          type="text"
          placeholder="Titre"
          value={titre}
          onChange={(event) => onTitreChange(event.target.value)}
          required
        />
        <p>Description de la tache</p>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(event) => onDescriptionChange(event.target.value)}
        />
        <p>Date d'échéance</p>
        <input
          type="date"
          value={dateEcheance}
          onChange={(event) => onDateEcheanceChange(event.target.value)}
        />
        {titre && <button onClick={onAjouter}>Ajouter</button>}
      </form>
    </div>
  );
}
