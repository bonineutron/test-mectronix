import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUserApp } from './user.interface';
import { getLocalStorage } from '@/utils';

const userLocalStorage: IUserApp | null = getLocalStorage<IUserApp>('user');

const userVoid: IUserApp = {
   accessToken: '',
   email: '',
   name: ''
};

const initialState: IUserApp = userLocalStorage ?? userVoid;

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      updateUser: (state, action: PayloadAction<IUserApp>) => {
         state.accessToken = action.payload.accessToken;
         state.email = action.payload.email;
         state.name = action.payload.name;
      },
      removeUser: (state) => {
         state.accessToken = '';
         state.email = '';
         state.name = '';
      }
   }
});

export const { updateUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
