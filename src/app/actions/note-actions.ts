import { Note } from '../models/modes';

export const USER_NOTES_REQUEST = 'user list request';
export const USER_NOTES_SUCCESS = 'user list success';
export const USER_NOTES_FAILED = 'user list failed';

export class userNotesRequestAction {
  readonly type = USER_NOTES_REQUEST;
}

export class userNotesSuccessAction {
  readonly type = USER_NOTES_SUCCESS;

  constructor(public payload?: Note[]) {}
}
