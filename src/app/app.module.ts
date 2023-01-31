import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NotesComponent } from './notes/notes.component';
import { NoteComponent } from './note/note.component';
import { UpcrtNoteComponent } from './upcrt-note/upcrt-note.component';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from './reducers';
import { AuthGuardService } from './services/guards/auth.guard.service';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    NotesComponent,
    NoteComponent,
    UpcrtNoteComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(rootReducer),
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
