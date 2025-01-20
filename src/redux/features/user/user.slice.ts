import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUserApp } from './user.interface';
import { getLocalStorage } from '@/utils';

const userLocalStorage: IUserApp | null = getLocalStorage<IUserApp>('user');

const userVoid: IUserApp = {
   id: null,
   userName: '',
   email: ''
};

const initialState: IUserApp = userLocalStorage ?? userVoid;

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      updateUser: (state, action: PayloadAction<IUserApp>) => {
         state.id = action.payload.id;
         state.userName = action.payload.userName;
         state.email = action.payload.email;
      },
      removeUser: (state) => {
         state.id = null;
         state.userName = '';
         state.email = '';
      }
   }
});

export const { updateUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
