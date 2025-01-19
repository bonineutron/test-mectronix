import { InputPassword, Button, Input, Popup } from '@/components';
import { inputChange, inputError, validateEmail } from '@/utils';
import authService from '@/services/endpoints/auth/auth.service';
import { IFormLogin } from '../AuthCard.interface';
import { useState } from 'react';

export function FormLogin(): JSX.Element {
   // Configuration

   // States
   const [formLogin, setFormLogin] = useState<IFormLogin>({
      email: { value: '' },
      password: { value: '' }
   });

   const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

   // Methods
   const handleSubmit = async (event: React.FormEvent): Promise<void> => {
      event.preventDefault();

      if (formDataFailed()) {
         return;
      }

      setLoadingSubmit(true);

      await authService.login({ email: formLogin.email.value, password: formLogin.password.value });

      setLoadingSubmit(false);
   };

   const formDataFailed = (): boolean => {
      let failed: boolean = false;

      if (!formLogin.email.value) {
         inputError<IFormLogin>(setFormLogin, 'email');

         failed = true;
      }

      if (formLogin.email.value && !validateEmail(formLogin.email.value)) {
         inputError<IFormLogin>(setFormLogin, 'email', 'Email invalido');

         failed = true;
      }

      if (!formLogin.password.value) {
         inputError<IFormLogin>(setFormLogin, 'password');

         failed = true;
      }

      return failed;
   };

   const validateEmailOnBlur = (): void => {
      if (formLogin.email.value && !validateEmail(formLogin.email.value)) {
         inputError<IFormLogin>(setFormLogin, 'email', 'Email invalido');
      }
   };

   const contentPopupAccountTest = (): JSX.Element => {
      return (
         <div className='flex flex-col gap-1'>
            <div className='flex gap-3'>
               <span className='font-semibold'>Cuenta:</span>

               <span>jimmie@gmail.com</span>
            </div>

            <div className='flex gap-3'>
               <span className='font-semibold'>Contraseña:</span>

               <span>klein*#%*</span>
            </div>
         </div>
      );
   };

   return (
      <form onSubmit={handleSubmit} className='w-full'>
         <Input
            id='email'
            name='email'
            type='text'
            label='Email'
            value={formLogin.email.value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
               inputChange<IFormLogin, string>(setFormLogin, 'email', event.target.value);
            }}
            onBlur={validateEmailOnBlur}
            error={formLogin.email.error}
            errorMessage={formLogin.email.errorMessage}
            fullWidth
         />

         <InputPassword
            label='Constraseña'
            value={formLogin.password.value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
               inputChange<IFormLogin, string>(setFormLogin, 'password', event.target.value);
            }}
            error={formLogin.password.error}
            errorMessage={formLogin.password.errorMessage}
         />

         <div className='w-full flex items-center justify-end gap-3 mt-2'>
            <Popup content={contentPopupAccountTest()}>
               <span className='text-[14px] font-semibold underline'>Cuenta de pruebas</span>
            </Popup>

            <Button submit={true} loading={loadingSubmit}>
               Ingresar
            </Button>
         </div>
      </form>
   );
}
