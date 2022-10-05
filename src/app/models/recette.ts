import { InventaireRessource } from "./inventaire-ressource";
import { Ressource } from "./ressource";

export class Recette {
  id: number = 0;
  inventaireRessource: InventaireRessource[] = [];
  niveau: number = 0;
}
