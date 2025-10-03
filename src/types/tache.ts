export type Tache = {
  id: string;
  titre: string;
  description: string;
  dateEcheance: string;
  terminee: boolean;
};

export type FiltreTache = "toutes" | "aFaire" | "terminees";
