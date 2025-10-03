import type { ChangeEvent } from "react";

type RechercheTachesProps = {
  valeur: string;
  onRechercheChange: (valeur: string) => void;
};

export function RechercheTaches({ valeur, onRechercheChange }: RechercheTachesProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onRechercheChange(event.target.value);
  }

  return (
    <div className="recherche-taches">
      <input
        id="recherche-taches-input"
        type="search"
        value={valeur}
        onChange={handleChange}
        placeholder="Rechercher"
        aria-label="Rechercher"
      />
    </div>
  );
}
