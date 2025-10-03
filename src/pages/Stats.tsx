import type { ReactElement } from "react";

type StatsPageProps = {
  total: number;
  terminees: number;
  aFaire: number;
  enRetard: number;
  echeanceProche: number;
};

export function StatsPage({
  total,
  terminees,
  aFaire,
  enRetard,
  echeanceProche,
}: StatsPageProps): ReactElement {
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

  const messageProgressionDetaillee = (() => {
    if (total === 0) {
      return "Commencez par ajouter une tâche pour suivre votre progression.";
    }
    if (aFaire === 0) {
      return "Toutes vos tâches sont finalisées, prenez le temps de savourer !";
    }
    return `Encore ${aFaire} tâche${aFaire > 1 ? "s" : ""} à finaliser.`;
  })();

  const messageRetard =
    enRetard === 0
      ? "Aucune tâche en retard. Gardez cette avance !"
      : `${enRetard} tâche${enRetard > 1 ? "s" : ""} nécessite une action immédiate.`;

  const messageEcheanceProche =
    echeanceProche === 0
      ? "Pas d'échéance imminente pour le moment."
      : `${echeanceProche} tâche${echeanceProche > 1 ? "s" : ""} arrivent à échéance dans les 3 prochains jours.`;

  const repartitionTaches = [
    {
      id: "terminees",
      label: "Terminées",
      valeur: terminees,
      couleur: "#22c55e",
    },
    {
      id: "a-faire",
      label: "À faire",
      valeur: aFaire,
      couleur: "#f97316",
    },
  ];

  const rayonDonut = 52;
  const perimetreDonut = 2 * Math.PI * rayonDonut;
  const offsetDonut =
    perimetreDonut - (pourcentageCompletion / 100) * perimetreDonut;

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

      <section className="stats-indicateurs">
        <h2>Surveillance des échéances</h2>
        <p className="stats-texte-intro">
          Ces indicateurs suivent uniquement les tâches actives (non cochées) afin
          de vous aider à prioriser ce qui doit être traité en premier.
        </p>
        <div className="stats-alertes">
          <article
            className={`carte-indicateur carte-retard ${
              enRetard > 0 ? "carte-indicateur-active" : ""
            }`}
          >
            <h3>Tâches en retard</h3>
            <p className="carte-indicateur-valeur">{enRetard}</p>
            <p className="carte-indicateur-message">{messageRetard}</p>
          </article>
          <article
            className={`carte-indicateur carte-echeance-proche ${
              echeanceProche > 0 ? "carte-indicateur-active" : ""
            }`}
          >
            <h3>Échéance proche (&lt; 3 jours)</h3>
            <p className="carte-indicateur-valeur">{echeanceProche}</p>
            <p className="carte-indicateur-message">{messageEcheanceProche}</p>
          </article>
        </div>
        <div className="stats-legende-couleurs">
          <h3>Repères visuels partagés</h3>
          <p>
            Les couleurs ci-dessous sont reprises dans la liste principale pour
            mettre en évidence les tâches concernées :
          </p>
          <ul>
            <li>
              <span className="legende-couleur badge-retard" aria-hidden="true" />
              <div>
                <strong>En retard</strong>
                <p>Fond rouge et badge associé dans la liste des tâches.</p>
              </div>
            </li>
            <li>
              <span
                className="legende-couleur badge-echeance-proche"
                aria-hidden="true"
              />
              <div>
                <strong>Échéance proche</strong>
                <p>Accent doré signalant une échéance dans moins de 3 jours.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="stats-visualisations">
        <article className="graphique-carte">
          <h2>Répartition des tâches</h2>
          {total === 0 ? (
            <p className="graphique-vide">
              Ajoutez des tâches pour visualiser leur répartition.
            </p>
          ) : (
            <>
              <div
                className="graphique-barre"
                role="img"
                aria-label={`Répartition des tâches : ${repartitionTaches
                  .map(
                    (segment) =>
                      `${segment.label} ${segment.valeur} tâche${
                        segment.valeur > 1 ? "s" : ""
                      }`
                  )
                  .join(", ")}.`}
              >
                {repartitionTaches.map((segment) => (
                  <span
                    key={segment.id}
                    className="graphique-barre-segment"
                    style={{
                      width:
                        total === 0
                          ? "0%"
                          : `${(segment.valeur / total) * 100}%`,
                      backgroundColor: segment.couleur,
                    }}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <ul className="graphique-legende">
                {repartitionTaches.map((segment) => {
                  const pourcentageSegment =
                    total === 0
                      ? 0
                      : Number(
                          ((segment.valeur / total) * 100).toFixed(1)
                        );
                  const pourcentageAfficheSegment = pourcentageSegment.toLocaleString(
                    "fr-FR",
                    {
                      maximumFractionDigits: 1,
                    }
                  );
                  return (
                    <li key={segment.id}>
                      <span
                        className="point-legende"
                        style={{ backgroundColor: segment.couleur }}
                        aria-hidden="true"
                      />
                      <span className="legende-label">{segment.label}</span>
                      <span className="legende-valeurs">
                        {segment.valeur} · {pourcentageAfficheSegment} %
                      </span>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </article>
        <article className="graphique-carte">
          <h2>Progression globale</h2>
          <div
            className="graphique-donut"
            role="img"
            aria-label={`Progression globale : ${pourcentageAffiche} % de complétion.`}
          >
            <svg viewBox="0 0 120 120" aria-hidden="true">
              <circle className="donut-cercle-fond" cx="60" cy="60" r="52" />
              <circle
                className="donut-cercle-progression"
                cx="60"
                cy="60"
                r="52"
                strokeDasharray={perimetreDonut}
                strokeDashoffset={offsetDonut}
              />
            </svg>
            <span className="donut-valeur">
              {pourcentageAffiche}
              <small>%</small>
            </span>
          </div>
          <p className="donut-texte">{messageProgressionDetaillee}</p>
        </article>
      </section>

      <p className="stats-texte-conclusion">{messageConclusion}</p>
    </div>
  );
}
