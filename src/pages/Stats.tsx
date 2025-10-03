import type { ReactElement } from "react";

type StatsPageProps = {
  total: number;
  terminees: number;
  aFaire: number;
};

export function StatsPage({ total, terminees, aFaire }: StatsPageProps): ReactElement {
  const pourcentageCompletion =
    total === 0 ? 0 : Number(((terminees / total) * 100).toFixed(1));
  const pourcentageAffiche = pourcentageCompletion.toLocaleString("fr-FR", {
    maximumFractionDigits: 1,
  });

  const messageIntroduction =
    total === 0
      ? "Aucune tâche enregistrée pour le moment."
      : `Vous suivez actuellement ${total} tâche${total > 1 ? "s" : ""}.`;

  const messageConclusion = (() => {
    if (total === 0) {
      return "Ajoutez votre première tâche pour voir vos statistiques évoluer.";
    }
    if (pourcentageCompletion === 100) {
      return "Toutes vos tâches sont terminées, bravo !";
    }
    return "Continuez sur cette lancée pour atteindre 100 % de complétion.";
  })();

  return (
    <div className="page-stats">
      <h1>Statistiques de vos tâches</h1>
      <p className="stats-texte-intro">{messageIntroduction}</p>
      <div className="resume-taches stats-cartes">
        <div className="carte-resume carte-animable">
          <span className="resume-titre">Total</span>
          <span className="resume-valeur">{total}</span>
        </div>
        <div className="carte-resume carte-animable">
          <span className="resume-titre">Terminées</span>
          <span className="resume-valeur">{terminees}</span>
        </div>
        <div className="carte-resume carte-animable">
          <span className="resume-titre">À faire</span>
          <span className="resume-valeur">{aFaire}</span>
        </div>
        <div className="carte-resume carte-animable">
          <span className="resume-titre">% complétion</span>
          <span className="resume-valeur">{pourcentageAffiche} %</span>
        </div>
      </div>
      <p className="stats-texte-conclusion">{messageConclusion}</p>
    </div>
  );
}
