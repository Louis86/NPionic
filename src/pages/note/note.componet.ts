import { Component, OnInit } from '@angular/core';
//import { NavController } from 'ionic-angular';
import {NoteService} from './note.service';
import {Note} from './note';
//import {EventService} from '../../app/event.service';
//import {routes} from '../../app/app.routing.module';
//import {Router,RouterModule} from '@angular/router';
import {CategorieService} from '../categorie/categorie.service';
//import {Categorie} from '../categorie/categorie';

@Component({
  selector: 'page-note',
  templateUrl: 'note.componet.html'
})

export class NotePage implements OnInit{

  nt: Note;
  public editerNote = false;
  public notes = [];
  public editNote;
  public categories = [];
  public ct = [];
  newnote: Note = null;
  selectedNote: Note;

  constructor(
    private _noteService: NoteService,
    private _cateService: CategorieService) { }




  ngOnInit() {
    this.getNote();
    //this.nt = new Note();
    //this.getCategories();
  }

  getNote(): void{
    this._noteService.getNote().subscribe(notes =>this.notes = notes);
  }

  canceledit(): void{
    this.newnote = null;
    this.selectedNote = null;
  }
  NewNote(): void{
    this.newnote = new Note;
    this.selectedNote = null;
    this.getCategories();
  }

  ajouterNote(newnote: Note): void {
    console.log(this.newnote);
    this._noteService.ajoutNote(newnote)
      .subscribe(_ => {
        this.getNote();
      });
    this.newnote = null;
  }


  supprimeNote(not: Note): void {
    this._noteService.supprimerNote(not.id)
      .subscribe(_ => {
        this.getNote();
      });
  }

  getCategories(): void {
    this._cateService.getCategorie().subscribe(categories => this.categories = categories);
  }

  edNote(note: Note): void {
    this.editerNote =true;
    this.getCategories();
    this.newnote = null;
    //this. editNote = note;
    this.selectedNote = new Note();
    this.selectedNote = note;
  }


  modifierNote(mdnote: Note) {
    this._noteService.editerNote(mdnote)
      .subscribe(_ => {
        this.getNote();
      });
    this.selectedNote = null;
  }
}
