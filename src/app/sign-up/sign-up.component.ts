import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { userSigninSuccess } from '../actions/user.actions';
import { RootReducerState } from '../reducers';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  signUp: FormGroup;
  password_error: Boolean;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private store: Store<RootReducerState>
  ) {
    this.signUp = this.fb.group({
      username: '',
      password: '',
      confirm_password: '',
    });
    this.password_error = false;
  }

  createSignUp() {
    if (this.signUp.value.password !== this.signUp.value.confirm_password) {
      this.password_error = true;
      return;
    }
    this.password_error = false;

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const data = {
      username: this.signUp.value.username,
      password: this.signUp.value.password,
    };

    this.http
      .put(
        'https://sparkle-9db5d-default-rtdb.asia-southeast1.firebasedatabase.app/' +
          this.signUp.value.username +
          '.json',
        data,
        {
          headers: headers,
        }
      )
      .subscribe((res) => {
        const data = {
          signned: true,
          username: this.signUp.value.username,
          password: this.signUp.value.password,
        };
        this.store.dispatch(new userSigninSuccess({ data }));
        this.router.navigate(['/notes']);
      });
  }
}
