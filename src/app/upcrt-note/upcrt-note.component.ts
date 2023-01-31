import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { getUserCreds, RootReducerState } from '../reducers';

@Component({
  selector: 'app-upcrt-note',
  templateUrl: './upcrt-note.component.html',
  styleUrls: ['./upcrt-note.component.css'],
})
export class UpcrtNoteComponent implements OnInit {
  public new: any = '';
  public date: string = Date.now().toString();
  noteForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    private store: Store<RootReducerState>,
    private router: Router
  ) {
    this.noteForm = this.fb.group({
      id: this.date,
      title: '',
      note: '',
    });
  }

  ngOnInit(): void {
    this.new = this.route.snapshot.queryParamMap.get('new');

    if (this.new !== 'true') {
      console.log('new here');
      let noteId = this.route.snapshot.queryParamMap.get('id');

      this.store.select(getUserCreds).subscribe((res) => {
        this.http
          .get(
            `https://sparkle-9db5d-default-rtdb.asia-southeast1.firebasedatabase.app/${res.username}/notes/${noteId}.json`
          )
          .subscribe((data: any) => {
            this.noteForm.setValue({
              id: data.data.id,
              title: data.data.title,
              note: data.data.note,
            });
          });
      });
    }
  }

  clearNote() {
    this.noteForm.setValue({
      id: this.date,
      title: '',
      note: '',
    });
  }

  createNote() {
    const data = {
      id: this.noteForm.value.id,
      title: this.noteForm.value.title,
      note: this.noteForm.value.note,
    };

    this.store.select(getUserCreds).subscribe((res) => {
      this.http
        .put(
          `https://sparkle-9db5d-default-rtdb.asia-southeast1.firebasedatabase.app/${res.username}/notes/${this.noteForm.value.id}.json`,
          { data }
        )
        .subscribe((data) => this.router.navigate(['/notes']));
    });
  }
}
