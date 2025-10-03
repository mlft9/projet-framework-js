import type { FiltreTache } from "../types/tache";

type FiltresTachesProps = {
  filtreActif: FiltreTache;
  onFiltreChange: (filtre: FiltreTache) => void;
};

const libelles: Record<FiltreTache, string> = {
  toutes: "Toutes",
  aFaire: "À faire",
  terminees: "Terminées",
};

export function FiltresTaches({ filtreActif, onFiltreChange }: FiltresTachesProps) {
  return (
    <div className="filtres-taches" role="group" aria-label="Filtres des tâches">
      {(Object.keys(libelles) as Array<FiltreTache>).map((filtre) => (
        <button
          key={filtre}
          type="button"
          className={`filtre-bouton ${filtreActif === filtre ? "actif" : ""}`}
          onClick={() => onFiltreChange(filtre)}
          aria-pressed={filtreActif === filtre}
        >
          {libelles[filtre]}
        </button>
      ))}
    </div>
  );
}
