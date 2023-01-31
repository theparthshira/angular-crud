import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import {
  userSigninSuccess,
  USER_SIGNIN_SUCCESS,
} from '../actions/user.actions';
import { getUserCreds, RootReducerState } from '../reducers';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  signIn: FormGroup;
  error_code: Boolean;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private store: Store<RootReducerState>
  ) {
    this.signIn = this.fb.group({
      username: '',
      password: '',
    });

    this.error_code = false;
  }

  checkSignIn() {
    if (
      this.signIn.value.username !== '' &&
      this.signIn.value.password !== ''
    ) {
      this.http
        .get(
          'https://sparkle-9db5d-default-rtdb.asia-southeast1.firebasedatabase.app/' +
            this.signIn.value.username +
            '.json'
        )
        .subscribe((val: any) => {
          if (val && this.signIn.value.password === val.password) {
            const data = {
              signned: true,
              username: this.signIn.value.username,
              password: this.signIn.value.password,
            };
            this.store.dispatch(new userSigninSuccess({ data }));
            this.router.navigate(['/notes']);
          } else {
            this.error_code = true;
          }
        });
    } else {
      this.error_code = true;
    }
  }
}
