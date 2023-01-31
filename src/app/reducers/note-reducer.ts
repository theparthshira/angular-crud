import { Action } from '../actions';
import {
  USER_NOTES_REQUEST,
  USER_NOTES_SUCCESS,
} from '../actions/note-actions';
import { Note } from '../models/modes';

// INTERFACE MODEL

export interface NoteReducerState {
  loading: boolean;
  loaded: boolean;
  notes: Note[];
}

// INITIAL STATE

const initialState: NoteReducerState = {
  loaded: false,
  loading: false,
  notes: [],
};

// REDUCERS

export function noteReducer(
  state = initialState,
  action: Action
): NoteReducerState {
  switch (action.type) {
    case USER_NOTES_REQUEST: {
      return { ...state, loading: true };
    }

    case USER_NOTES_SUCCESS: {
      const data = state.notes.concat(action.payload.data);

      return { ...state, loaded: true, loading: false, notes: data };
    }

    default: {
      return state;
    }
  }
}

// SELECTORS

export const getLoading = (state: NoteReducerState) => state.loading;

export const getLoaded = (state: NoteReducerState) => state.loaded;

export const getNotes = (state: NoteReducerState) => state.notes;
