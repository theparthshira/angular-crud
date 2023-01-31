import { User } from '../models/modes';

export const USER_SIGNIN_SUCCESS = 'user signed in';
export const USER_SIGNIN_FAILED = 'user signin failed';
export const USER_SIGNOUT_SUCCESS = 'user signed out';

export class userSigninSuccess {
  readonly type = USER_SIGNIN_SUCCESS;

  constructor(public payload?: { data: User }) {}
}

export class userSigninFailed {
  readonly type = USER_SIGNIN_FAILED;
}

export class userSignoutSuccess {
  readonly type = USER_SIGNOUT_SUCCESS;
}
