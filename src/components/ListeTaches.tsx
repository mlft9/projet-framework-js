import type { Tache } from "../types/tache";

type ListeTachesProps = {
  taches: Tache[];
  enSuppression: string[];
  derniereTacheAjoutee: string | null;
  idEnEdition: string | null;
  titreEdition: string;
  descriptionEdition: string;
  dateEcheanceEdition: string;
  onTitreEditionChange: (valeur: string) => void;
  onDescriptionEditionChange: (valeur: string) => void;
  onDateEcheanceEditionChange: (valeur: string) => void;
  onBasculerEtat: (id: string) => void;
  onDemarrerEdition: (tache: Tache) => void;
  onAnnulerEdition: () => void;
  onEnregistrerEdition: (id: string) => void;
  onSupprimerTache: (id: string) => void;
  onFinSuppression: (id: string, animationName?: string) => void;
};

export function ListeTaches({
  taches,
  enSuppression,
  derniereTacheAjoutee,
  idEnEdition,
  titreEdition,
  descriptionEdition,
  dateEcheanceEdition,
  onTitreEditionChange,
  onDescriptionEditionChange,
  onDateEcheanceEditionChange,
  onBasculerEtat,
  onDemarrerEdition,
  onAnnulerEdition,
  onEnregistrerEdition,
  onSupprimerTache,
  onFinSuppression,
}: ListeTachesProps) {
  return (
    <ul>
      {taches.map((tache) => (
        <li
          key={tache.id}
          className={`tache-item ${tache.terminee ? "tache-terminee" : ""} ${
            enSuppression.includes(tache.id) ? "tache-suppression" : ""
          } ${derniereTacheAjoutee === tache.id ? "tache-ajout" : ""}`}
          onAnimationEnd={(event) => onFinSuppression(tache.id, event.animationName)}
        >
          {idEnEdition === tache.id ? (
            <div className="edition-tache">
              <div className="edition-entete">
                <label className="statut-tache statut-edition">
                  <input
                    type="checkbox"
                    checked={tache.terminee}
                    onChange={() => onBasculerEtat(tache.id)}
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
                    onChange={(event) => onTitreEditionChange(event.target.value)}
                    required
                  />
                </label>
                <label>
                  <span>Description</span>
                  <input
                    type="text"
                    value={descriptionEdition}
                    onChange={(event) =>
                      onDescriptionEditionChange(event.target.value)
                    }
                  />
                </label>
                <label>
                  <span>Date d'échéance</span>
                  <input
                    type="date"
                    value={dateEcheanceEdition}
                    onChange={(event) =>
                      onDateEcheanceEditionChange(event.target.value)
                    }
                  />
                </label>
              </div>
              <div className="edition-actions">
                <button
                  type="button"
                  onClick={() => onEnregistrerEdition(tache.id)}
                  disabled={!titreEdition.trim()}
                >
                  Enregistrer
                </button>
                <button
                  type="button"
                  className="bouton-secondaire"
                  onClick={onAnnulerEdition}
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
                      onChange={() => onBasculerEtat(tache.id)}
                    />
                    <span>{tache.terminee ? "Réalisée" : "À faire"}</span>
                  </label>
                  <button
                    type="button"
                    className="bouton-edition"
                    onClick={() => onDemarrerEdition(tache)}
                    aria-label={`Modifier la tâche ${tache.titre}`}
                  >
                    Modifier
                  </button>
                  <button
                    type="button"
                    className="bouton-suppression"
                    onClick={() => onSupprimerTache(tache.id)}
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
  );
}
