import { useEffect, useMemo, useState } from "react";
import type { MouseEvent } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import "./App.css";
import { FormulaireTache } from "./components/FormulaireTache";
import { ResumeTaches } from "./components/ResumeTaches";
import { FiltresTaches } from "./components/FiltresTaches";
import { ListeTaches } from "./components/ListeTaches";
import { ModalConfirmation } from "./components/ModalConfirmation";
import { RechercheTaches } from "./components/RechercheTaches";
import type { FiltreTache, Tache } from "./types/tache";
import { StatsPage } from "./pages/Stats";

function App() {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [dateEcheance, setDateEcheance] = useState("");

  const [liste, setListe] = useState<Array<Tache>>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    const donnees = window.localStorage.getItem("taches");
    if (!donnees) {
      return [];
    }

    try {
      const tachesStockees: Tache[] = JSON.parse(donnees);
      if (!Array.isArray(tachesStockees)) {
        return [];
      }
      return tachesStockees.map((tache) => ({
        ...tache,
        id: tache.id ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        terminee: Boolean(tache.terminee),
      }));
    } catch (error) {
      console.error("Impossible de lire les tâches en mémoire :", error);
      return [];
    }
  });
  const [enSuppression, setEnSuppression] = useState<Array<string>>([]);
  const [tacheASupprimer, setTacheASupprimer] = useState<Tache | null>(null);
  const [idEnEdition, setIdEnEdition] = useState<string | null>(null);
  const [titreEdition, setTitreEdition] = useState("");
  const [descriptionEdition, setDescriptionEdition] = useState("");
  const [dateEcheanceEdition, setDateEcheanceEdition] = useState("");
  const [derniereTacheAjoutee, setDerniereTacheAjoutee] = useState<string | null>(
    null
  );
  const [animeCompteurAFaire, setAnimeCompteurAFaire] = useState(false);
  const [animeCompteurTerminees, setAnimeCompteurTerminees] = useState(false);
  const [filtreActif, setFiltreActif] = useState<FiltreTache>("toutes");
  const [termeRecherche, setTermeRecherche] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem("taches", JSON.stringify(liste));
  }, [liste]);

  function addTache(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const nouvelleTache: Tache = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      titre: titre.trim(),
      description: description.trim(),
      dateEcheance,
      terminee: false,
    };
    setListe((taches) => [...taches, nouvelleTache]);
    console.log(JSON.stringify(nouvelleTache));
    setTitre("");
    setDescription("");
    setDateEcheance("");
    setDerniereTacheAjoutee(nouvelleTache.id);
  }

  function basculerEtatTache(id: string) {
    setListe((taches) =>
      taches.map((tache) =>
        tache.id === id ? { ...tache, terminee: !tache.terminee } : tache
      )
    );
  }

  function supprimerTache(id: string) {
    const tache = liste.find((element) => element.id === id);
    if (!tache) {
      return;
    }
    setTacheASupprimer(tache);
  }

  function confirmerSuppressionTache() {
    if (!tacheASupprimer) {
      return;
    }
    const id = tacheASupprimer.id;
    setEnSuppression((ids) => (ids.includes(id) ? ids : [...ids, id]));
    setTacheASupprimer(null);
  }

  function annulerSuppressionTache() {
    setTacheASupprimer(null);
  }

  function gererFinSuppression(id: string, animationName?: string) {
    if (animationName && animationName !== "disparitionTache") {
      return;
    }
    setEnSuppression((ids) => {
      if (!ids.includes(id)) {
        return ids;
      }
      setListe((taches) => taches.filter((tache) => tache.id !== id));
      return ids.filter((valeur) => valeur !== id);
    });
  }

  function demarrerEdition(tache: Tache) {
    setIdEnEdition(tache.id);
    setTitreEdition(tache.titre);
    setDescriptionEdition(tache.description);
    setDateEcheanceEdition(tache.dateEcheance);
  }

  function annulerEdition() {
    setIdEnEdition(null);
    setTitreEdition("");
    setDescriptionEdition("");
    setDateEcheanceEdition("");
  }

  function enregistrerEdition(id: string) {
    if (!titreEdition.trim()) {
      return;
    }
    setListe((taches) =>
      taches.map((tache) =>
        tache.id === id
          ? {
              ...tache,
              titre: titreEdition.trim(),
              description: descriptionEdition.trim(),
              dateEcheance: dateEcheanceEdition,
            }
          : tache
      )
    );
    annulerEdition();
  }

  const convertirDateLocale = (valeur: string): Date | null => {
    if (!valeur) {
      return null;
    }
    const [annee, mois, jour] = valeur.split("-");
    if (!annee || !mois || !jour) {
      return null;
    }
    const date = new Date(Number(annee), Number(mois) - 1, Number(jour));
    if (Number.isNaN(date.getTime())) {
      return null;
    }
    date.setHours(0, 0, 0, 0);
    return date;
  };

  const nombreTerminees = liste.filter((tache) => tache.terminee).length;
  const nombreAFaire = liste.length - nombreTerminees;

  const {
    tachesEnRetard,
    tachesEcheanceProche,
    nombreEnRetard,
    nombreEcheanceProche,
  } = useMemo(() => {
    const maintenant = new Date();
    maintenant.setHours(0, 0, 0, 0);
    const limiteProche = new Date(maintenant);
    limiteProche.setDate(limiteProche.getDate() + 3);

    const idsRetard: string[] = [];
    const idsProches: string[] = [];

    liste.forEach((tache) => {
      if (tache.terminee) {
        return;
      }
      const dateEcheanceNormalisee = convertirDateLocale(tache.dateEcheance);
      if (!dateEcheanceNormalisee) {
        return;
      }
      if (dateEcheanceNormalisee < maintenant) {
        idsRetard.push(tache.id);
        return;
      }
      if (
        dateEcheanceNormalisee >= maintenant &&
        dateEcheanceNormalisee <= limiteProche
      ) {
        idsProches.push(tache.id);
      }
    });

    return {
      tachesEnRetard: idsRetard,
      tachesEcheanceProche: idsProches,
      nombreEnRetard: idsRetard.length,
      nombreEcheanceProche: idsProches.length,
    };
  }, [liste]);

  const listeFiltree = useMemo(() => {
    const listeSelonFiltre = (() => {
      switch (filtreActif) {
        case "aFaire":
          return liste.filter((tache) => !tache.terminee);
        case "terminees":
          return liste.filter((tache) => tache.terminee);
        default:
          return liste;
      }
    })();

    const rechercheNormalisee = termeRecherche.trim().toLowerCase();
    if (!rechercheNormalisee) {
      return listeSelonFiltre;
    }

    return listeSelonFiltre.filter((tache) => {
      const titre = tache.titre.toLowerCase();
      const description = tache.description.toLowerCase();
      return (
        titre.includes(rechercheNormalisee) ||
        description.includes(rechercheNormalisee)
      );
    });
  }, [liste, filtreActif, termeRecherche]);

  const messageAucunResultat = useMemo(() => {
    if (termeRecherche.trim()) {
      return "Aucune tâche ne correspond à votre recherche.";
    }

    switch (filtreActif) {
      case "aFaire":
        return "Aucune tâche à faire pour le moment.";
      case "terminees":
        return "Aucune tâche terminée pour le moment.";
      default:
        return "Aucune tâche n'a encore été ajoutée.";
    }
  }, [filtreActif, termeRecherche]);

  useEffect(() => {
    if (!derniereTacheAjoutee) {
      return;
    }
    const timer = window.setTimeout(() => {
      setDerniereTacheAjoutee(null);
    }, 700);
    return () => window.clearTimeout(timer);
  }, [derniereTacheAjoutee]);

  useEffect(() => {
    setAnimeCompteurAFaire(true);
    const timer = window.setTimeout(() => setAnimeCompteurAFaire(false), 600);
    return () => window.clearTimeout(timer);
  }, [nombreAFaire]);

  useEffect(() => {
    setAnimeCompteurTerminees(true);
    const timer = window.setTimeout(() => setAnimeCompteurTerminees(false), 600);
    return () => window.clearTimeout(timer);
  }, [nombreTerminees]);

  const pageAccueil = (
    <div className="page-accueil">
      <h1>Bonjour 👋</h1>
      <h2>Voici un formulaire de to-do list</h2>
      <ResumeTaches
        nombreAFaire={nombreAFaire}
        nombreTerminees={nombreTerminees}
        animeCompteurAFaire={animeCompteurAFaire}
        animeCompteurTerminees={animeCompteurTerminees}
      />
      <div className="main-layout">
        <FormulaireTache
          titre={titre}
          description={description}
          dateEcheance={dateEcheance}
          onTitreChange={setTitre}
          onDescriptionChange={setDescription}
          onDateEcheanceChange={setDateEcheance}
          onAjouter={addTache}
        />
        <div className="taches-list bloc-animable">
          <h2>Liste des tâches</h2>
          <div className="zone-controles-taches">
            <RechercheTaches
              valeur={termeRecherche}
              onRechercheChange={setTermeRecherche}
            />
            <FiltresTaches
              filtreActif={filtreActif}
              onFiltreChange={setFiltreActif}
            />
          </div>
          {listeFiltree.length === 0 ? (
            <p className="liste-vide">{messageAucunResultat}</p>
          ) : (
            <ListeTaches
              taches={listeFiltree}
              enSuppression={enSuppression}
              derniereTacheAjoutee={derniereTacheAjoutee}
              idEnEdition={idEnEdition}
              titreEdition={titreEdition}
              descriptionEdition={descriptionEdition}
              dateEcheanceEdition={dateEcheanceEdition}
              onTitreEditionChange={setTitreEdition}
              onDescriptionEditionChange={setDescriptionEdition}
              onDateEcheanceEditionChange={setDateEcheanceEdition}
              onBasculerEtat={basculerEtatTache}
              onDemarrerEdition={demarrerEdition}
              onAnnulerEdition={annulerEdition}
              onEnregistrerEdition={enregistrerEdition}
              onSupprimerTache={supprimerTache}
              onFinSuppression={gererFinSuppression}
              tachesEnRetard={tachesEnRetard}
              tachesEcheanceProche={tachesEcheanceProche}
            />
          )}
        </div>
      </div>
      {tacheASupprimer && (
        <ModalConfirmation
          tache={tacheASupprimer}
          onConfirmer={confirmerSuppressionTache}
          onAnnuler={annulerSuppressionTache}
        />
      )}
    </div>
  );

  return (
    <div className="app-page">
      <header className="app-entete">
        <nav className="app-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-lien ${isActive ? "nav-lien-actif" : ""}`
            }
          >
            Accueil
          </NavLink>
          <NavLink
            to="/stats"
            className={({ isActive }) =>
              `nav-lien ${isActive ? "nav-lien-actif" : ""}`
            }
          >
            Statistiques
          </NavLink>
        </nav>
      </header>
      <main className="app-contenu">
        <Routes>
          <Route path="/" element={pageAccueil} />
          <Route
            path="/stats"
            element={
              <StatsPage
                total={liste.length}
                terminees={nombreTerminees}
                aFaire={nombreAFaire}
                enRetard={nombreEnRetard}
                echeanceProche={nombreEcheanceProche}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
