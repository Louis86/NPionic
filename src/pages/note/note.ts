import {Categorie} from '../categorie/categorie';
export class Note {
  id: number;
  title: string = '';
  content: string = '';
  date: Date;
  categorie: Categorie;

}
