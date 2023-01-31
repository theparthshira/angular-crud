import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotesComponent } from './notes/notes.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthGuardService } from './services/guards/auth.guard.service';
import { NoteComponent } from './note/note.component';
import { UpcrtNoteComponent } from './upcrt-note/upcrt-note.component';

const routes: Routes = [
  {
    component: HomeComponent,
    path: '',
  },
  {
    component: SignInComponent,
    path: 'login',
  },
  {
    component: SignUpComponent,
    path: 'signup',
  },
  {
    component: NotesComponent,
    canActivate: [AuthGuardService],
    path: 'notes',
  },
  {
    component: NoteComponent,
    canActivate: [AuthGuardService],
    path: 'note',
  },
  {
    component: UpcrtNoteComponent,
    canActivate: [AuthGuardService],
    path: 'upcreate',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
