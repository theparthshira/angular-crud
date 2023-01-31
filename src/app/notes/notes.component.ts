import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { userSignoutSuccess } from '../actions/user.actions';
import { Note } from '../models/modes';
import { getUserCreds, RootReducerState } from '../reducers';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {
  notes: Note[];
  constructor(
    private router: Router,
    private store: Store<RootReducerState>,
    private http: HttpClient
  ) {
    this.notes = [];
  }

  ngOnInit(): void {
    this.getNotes();
  }

  logout() {
    this.store.dispatch(new userSignoutSuccess());
    this.router.navigate(['']);
  }

  newNote() {
    this.router.navigate(['/upcreate'], {
      queryParams: { new: true },
    });
  }

  getNotes() {
    this.store.select(getUserCreds).subscribe((res) => {
      this.http
        .get(
          `https://sparkle-9db5d-default-rtdb.asia-southeast1.firebasedatabase.app/${res.username}/notes.json`
        )
        .subscribe((data: any) => {
          if (data === null) {
            this.notes = [];
          } else {
            this.notes = [];
            Object.keys(data).map((ele: any) => {
              this.notes.push({
                id: data[ele].data.id,
                title: data[ele].data.title,
                note: data[ele].data.note,
              });
            });
          }
        });
    });
  }

  deleteNote(note: Note) {
    this.store.select(getUserCreds).subscribe((res) => {
      this.http
        .delete(
          `https://sparkle-9db5d-default-rtdb.asia-southeast1.firebasedatabase.app/${res.username}/notes/${note.id}.json`
        )
        .subscribe((data) => this.getNotes());
    });
  }

  editNote(note: Note) {
    this.router.navigate(['/upcreate'], {
      queryParams: { new: false, id: note.id },
    });
  }
}
