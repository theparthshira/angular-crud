import { Action } from '../actions';
import {
  USER_SIGNIN_FAILED,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT_SUCCESS,
} from '../actions/user.actions';

export interface UserReducerState {
  signned: boolean;
  username: string;
  password: string;
}

const initialState: UserReducerState = {
  signned: false,
  username: '',
  password: '',
};

export function userReducer(state = initialState, action: Action) {
  switch (action.type) {
    case USER_SIGNIN_FAILED: {
      return { ...state, signned: false };
    }

    case USER_SIGNIN_SUCCESS: {
      return {
        // ...state,
        signned: true,
        username: action.payload.data.username,
        password: action.payload.data.password,
      };
    }

    case USER_SIGNOUT_SUCCESS: {
      return {
        ...state,
        signned: false,
        username: '',
        password: '',
      };
    }

    default: {
      return state;
    }
  }
}

export const getUserCreds = (state: UserReducerState) => state;

export const getUserSignned = (state: UserReducerState) => state.signned;
