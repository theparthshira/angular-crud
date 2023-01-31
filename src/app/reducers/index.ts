import { ActionReducerMap, createSelector } from '@ngrx/store';
import * as fromNote from './note-reducer';
import * as fromUser from './user-reducer';

export interface RootReducerState {
  notes: fromNote.NoteReducerState;
  user: fromUser.UserReducerState;
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
  notes: fromNote.noteReducer,
  user: fromUser.userReducer,
};

export const getNoteState = (state: RootReducerState) => state.notes;
export const getUserState = (state: RootReducerState) => state.user;

export const getNoteLoaded = createSelector(getNoteState, fromNote.getLoaded);
export const getNoteLoading = createSelector(getNoteState, fromNote.getLoading);
export const getNotes = createSelector(getNoteState, fromNote.getNotes);

export const getUserCreds = createSelector(getUserState, fromUser.getUserCreds);
export const getUserSignned = createSelector(
  getUserState,
  fromUser.getUserSignned
);
