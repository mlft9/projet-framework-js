import type { Tache } from "../types/tache";

type ModalConfirmationProps = {
  tache: Tache;
  onConfirmer: () => void;
  onAnnuler: () => void;
};

export function ModalConfirmation({
  tache,
  onConfirmer,
  onAnnuler,
}: ModalConfirmationProps) {
  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirmation-suppression-titre"
      onClick={onAnnuler}
    >
      <div className="modal-content" onClick={(event) => event.stopPropagation()}>
        <h3 id="confirmation-suppression-titre">Confirmer la suppression</h3>
        <p>
          Voulez-vous vraiment supprimer la tache {" "}
          <strong>{tache.titre || "sans titre"}</strong> ?
        </p>
        <div className="modal-actions">
          <button
            type="button"
            className="bouton-suppression"
            onClick={onConfirmer}
          >
            Supprimer
          </button>
          <button
            type="button"
            className="bouton-secondaire"
            onClick={onAnnuler}
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}
