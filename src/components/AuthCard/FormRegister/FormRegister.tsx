import { inputChange, inputError, validateEmail } from '@/utils';
import authService from '@/services/endpoints/auth/auth.service';
import { Input, Button, InputPassword } from '@/components';
import { IFormRegister } from '../AuthCard.interface';
import React, { useState } from 'react';

export function FormRegister(): JSX.Element {
   // States
   const [formRegister, setFormRegister] = useState<IFormRegister>({
      email: { value: '' },
      userName: { value: '' },
      password: { value: '' },
      confirmPassword: { value: '' }
   });

   const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

   // Methods
   const handleSubmit = async (event: React.FormEvent): Promise<void> => {
      event.preventDefault();

      if (formDataFailed()) {
         return;
      }

      setLoadingSubmit(true);

      await authService.register({
         email: formRegister.email.value,
         userName: formRegister.userName.value,
         password: formRegister.password.value
      });

      setLoadingSubmit(false);
   };

   const formDataFailed = (): boolean => {
      let failed: boolean = false;

      if (!formRegister.email.value) {
         inputError<IFormRegister>(setFormRegister, 'email');

         failed = true;
      }

      if (formRegister.email.value && !validateEmail(formRegister.email.value)) {
         inputError<IFormRegister>(setFormRegister, 'email', 'Email invalido');

         failed = true;
      }

      if (!formRegister.userName.value) {
         inputError<IFormRegister>(setFormRegister, 'userName');

         failed = true;
      }

      if (!formRegister.password.value) {
         inputError<IFormRegister>(setFormRegister, 'password');

         failed = true;
      }

      if (!formRegister.confirmPassword.value) {
         inputError<IFormRegister>(setFormRegister, 'confirmPassword');

         failed = true;
      }

      if (
         formRegister.password.value &&
         formRegister.confirmPassword.value &&
         formRegister.password.value !== formRegister.confirmPassword.value
      ) {
         inputError<IFormRegister>(setFormRegister, 'confirmPassword', 'Las contraseñas no coinciden');

         failed = true;
      }

      return failed;
   };

   const validateEmailOnBlur = (): void => {
      if (formRegister.email.value && !validateEmail(formRegister.email.value)) {
         inputError<IFormRegister>(setFormRegister, 'email', 'Email invalido');
      }
   };

   const validatePasswordOnBlur = (): void => {
      if (formRegister.password.value !== formRegister.confirmPassword.value) {
         inputError<IFormRegister>(setFormRegister, 'confirmPassword', 'Las contraseñas no coinciden');
      }
   };

   return (
      <form onSubmit={handleSubmit} className='w-full'>
         <Input
            id='email'
            name='email'
            type='text'
            label='Email'
            value={formRegister.email.value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
               inputChange<IFormRegister, string>(setFormRegister, 'email', event.target.value);
            }}
            onBlur={validateEmailOnBlur}
            error={formRegister.email.error}
            errorMessage={formRegister.email.errorMessage}
            fullWidth
         />

         <Input
            id='userName'
            name='userName'
            type='text'
            label='Nombre de usuario'
            value={formRegister.userName.value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
               inputChange<IFormRegister, string>(setFormRegister, 'userName', event.target.value);
            }}
            error={formRegister.userName.error}
            errorMessage={formRegister.userName.errorMessage}
            fullWidth
         />

         <InputPassword
            label='Constraseña'
            value={formRegister.password.value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
               inputChange<IFormRegister, string>(setFormRegister, 'password', event.target.value);
            }}
            error={formRegister.password.error}
            errorMessage={formRegister.password.errorMessage}
         />

         <InputPassword
            id='confirm-password'
            label='Confirmar constraseña'
            value={formRegister.confirmPassword.value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
               inputChange<IFormRegister, string>(setFormRegister, 'confirmPassword', event.target.value);
            }}
            onBlur={validatePasswordOnBlur}
            error={formRegister.confirmPassword.error}
            errorMessage={formRegister.confirmPassword.errorMessage}
         />

         <div className='w-full flex justify-end mt-2'>
            <Button submit={true} loading={loadingSubmit}>
               Registrarse
            </Button>
         </div>
      </form>
   );
}
