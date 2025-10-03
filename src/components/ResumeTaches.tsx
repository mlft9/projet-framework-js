type ResumeTachesProps = {
  nombreAFaire: number;
  nombreTerminees: number;
  animeCompteurAFaire: boolean;
  animeCompteurTerminees: boolean;
};

export function ResumeTaches({
  nombreAFaire,
  nombreTerminees,
  animeCompteurAFaire,
  animeCompteurTerminees,
}: ResumeTachesProps) {
  return (
    <div className="resume-taches">
      <div className="carte-resume carte-animable">
        <span className="resume-titre">À faire</span>
        <span
          className={`resume-valeur ${
            animeCompteurAFaire ? "compteur-anime" : ""
          }`}
        >
          {nombreAFaire}
        </span>
      </div>
      <div className="carte-resume carte-animable">
        <span className="resume-titre">Terminées</span>
        <span
          className={`resume-valeur ${
            animeCompteurTerminees ? "compteur-anime" : ""
          }`}
        >
          {nombreTerminees}
        </span>
      </div>
    </div>
  );
}
