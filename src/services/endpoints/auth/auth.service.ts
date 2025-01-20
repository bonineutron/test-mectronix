import { IBodyCreateUser, IParamsLogin, IParamsRegister, IResponseUser } from './auth.interface';
import { openAlert } from '@/redux/features/alert-dialog/alert-dialog.slice';
import { IUserApp } from '@/redux/features/user/user.interface';
import { updateUser } from '@/redux/features/user/user.slice';
import { IResponseApi } from '@/services/api.interface';
import { ETypeAlertDialog } from '@/components';
import apiService from '@/services/api.service';
import { Dispatch } from '@reduxjs/toolkit';
import { setLocalStorage } from '@/utils';

class authService {
   private dispatch: Dispatch | null = null;

   public setHooks(dispatch: Dispatch) {
      this.dispatch = dispatch;
   }

   public async login({ email, password }: IParamsLogin): Promise<void> {
      const responseGetAllUsers: IResponseApi<IResponseUser[]> = await apiService.get('/users');

      if (this.dispatch) {
         if (responseGetAllUsers.error) {
            this.dispatch(
               openAlert({
                  type: ETypeAlertDialog.Error,
                  description: 'Ha ocurrido un error.'
               })
            );
         }

         if (responseGetAllUsers.data && responseGetAllUsers.data.length > 0) {
            const allUsers: IResponseUser[] = responseGetAllUsers.data;

            const existUser: IResponseUser | undefined = allUsers.find((user) => user.email === email);

            if (!existUser) {
               this.dispatch(
                  openAlert({
                     type: ETypeAlertDialog.Error,
                     description: 'Email no encontrado.'
                  })
               );
            }

            if (existUser && existUser.password !== password) {
               this.dispatch(
                  openAlert({
                     type: ETypeAlertDialog.Error,
                     description: 'Constraseña incorrecta.'
                  })
               );
            }

            if (existUser && existUser.password === password) {
               const user: IUserApp = {
                  id: existUser.id,
                  email: existUser.email,
                  userName: existUser.username
               };

               setLocalStorage<IUserApp>('user', user);

               this.dispatch(updateUser(user));
            }
         }
      } else {
         console.error('Dispatch is necessary.');
      }
   }

   public async register({ email, userName, password }: IParamsRegister): Promise<void> {
      const userToCreate: IBodyCreateUser = {
         email: email,
         username: userName,
         password: password,
         name: {
            firstname: 'test',
            lastname: 'test'
         },
         address: {
            city: 'test',
            street: 'test',
            number: 1,
            zipcode: 'test',
            geolocation: {
               lat: 'test',
               long: 'test'
            }
         },
         phone: 'test'
      };

      const responseCreateUser: IResponseApi<{ id: number }> = await apiService.post('/users', userToCreate);

      if (this.dispatch) {
         if (responseCreateUser.error) {
            this.dispatch(
               openAlert({
                  type: ETypeAlertDialog.Error,
                  description: 'Ha ocurrido un error.'
               })
            );
         }

         if (responseCreateUser.data?.id) {
            const user: IUserApp = {
               id: responseCreateUser.data.id,
               email: email,
               userName: userName
            };

            setLocalStorage<IUserApp>('user', user);

            this.dispatch(updateUser(user));
         }
      } else {
         console.error('Dispatch is necessary.');
      }
   }
}

export default new authService();
