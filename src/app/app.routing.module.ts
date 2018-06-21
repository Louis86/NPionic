import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyApp} from './app.component';
import {NotePage } from '../pages/note/note.componet';
import {CategoriePage} from '../pages/categorie/categorie.componet';

export const routes: Routes = [
  { path: '', redirectTo: 'MyApp ', pathMatch: 'full' },
  { path: 'Note', component: NotePage },
  { path: 'Categories', component: CategoriePage }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
