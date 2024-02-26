import { createSlice } from '@reduxjs/toolkit';
import appConfig from '../../appConfig';
import { GetCurrentUserQuery } from 'gql/graphql';

export interface ForgetPasswordState {
  loading: boolean;
  token: string | null
}

export interface UserSliceState {
  currentUser: null | GetCurrentUserQuery;
  login: {
    loading: boolean;
  },
  forgetPassword: ForgetPasswordState
}

const initialState: UserSliceState = {
  currentUser: null,
  login: {
    loading: false
  },
  forgetPassword: {
    loading: false,
    token: null,
  }
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state) => {
      state.login.loading = true;
      console.log('logging in');
    },
    updateForgetPassword: (state, { payload }: { payload: ForgetPasswordState }) => {
      state.forgetPassword = payload;
      console.log('updateForgetPassword initiate', state, payload);
    },
    setUser: (state, { payload }: { payload: GetCurrentUserQuery }) => {
      console.log(state.currentUser, payload);
      state.currentUser = payload;
      state.login.loading = payload ? false : true;
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem(appConfig.storage.user);
    }
  }
});

// Action creators are generated for each case reducer function
export const userSliceActions = userSlice.actions;

export default userSlice.reducer;
