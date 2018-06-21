import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Categorie} from "./categorie";
import {CategorieService} from "./categorie.service";


@Component({
  selector: 'page-ctegorie',
  templateUrl: 'categorie.componet.html'
})

export class CategoriePage implements OnInit {

  public editer = false;
  public categories = [];

  public errorMsg;
  cat: Categorie;

  errorMessage: string;
  selectedCategory: Categorie;
  newcategory: Categorie = null;

  constructor(
    private _categorieService: CategorieService,
    public navCtrl: NavController) { }

  ngOnInit() {
    this.getCategories();
    this.cat = new Categorie();
  }


  getCategories(): void {
    this._categorieService.getCategorie()
      .subscribe(categories => this.categories = categories);
  }

  NewCategory():void {
    this.newcategory = new Categorie;
    this.selectedCategory = null;
  }

  ajouterCategorie(newcat: Categorie): void {
    this.cat.libelle = newcat.libelle;
    this.cat.id = newcat.id;
    this._categorieService.ajoutCategorie(this.cat)
      .subscribe(_ =>
      {
        this.getCategories();
      });
    this.newcategory = null;
  }

  supprimerCategorie(ctg: Categorie): void {
    this._categorieService.supprimerCategorie(ctg.id)
      .subscribe(_ => {
        this.getCategories();
      });
  }

  editcat(cat: Categorie):void {
    this.newcategory = null;
    this.selectedCategory = new Categorie;
    this.selectedCategory = cat;
  }


  modifierCategorie(categ: Categorie): void {
    this._categorieService.editerCategorie(categ.id, categ.libelle)
      .subscribe(_ => {
        this.getCategories();
      });
    this.canceledit();
  }


  canceledit(): void {
    this.newcategory = null;
    this.selectedCategory = null;
  }

}
