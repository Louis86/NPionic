import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { CategoriePage } from '../pages/categorie/categorie.componet';
import { NotePage } from '../pages/note/note.componet';
import {MessageService} from "../pages/categorie/message.service";

//import { AppRoutingModule } from './app.routing.module';
import { FormsModule }   from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import {NoteService} from "../pages/note/note.service";
import {CategorieService} from "../pages/categorie/categorie.service";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    CategoriePage,
    NotePage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CategoriePage,
    NotePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NoteService,
    CategorieService,
    MessageService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
