import { FormRegister } from './FormRegister/FormRegister';
import { FormLogin } from './FormLogin/FormLogin';
import { EModeLogin } from './AuthCard.enum';
import { useState } from 'react';

export function AuthCard(): JSX.Element {
   // States
   const [modeCard, setModeCard] = useState<EModeLogin>(EModeLogin.Login);

   // Methods
   const validateStylesByMode = (mode: EModeLogin): string => {
      const generalClasses = 'h-full w-[50%] transition-all';

      if (mode === modeCard) {
         return `${generalClasses} bg-secondary-color text-white`;
      }

      if (mode !== modeCard) {
         return `${generalClasses} bg-slate-200 hover:bg-slate-300`;
      }

      return `${generalClasses}`;
   };

   return (
      <div className='h-fit w-[90%] md:w-full max-w-[400px] bg-white shadow-md rounded-md overflow-hidden'>
         <div className='h-[40px] w-full flex items-center'>
            <button onClick={() => setModeCard(EModeLogin.Login)} className={validateStylesByMode(EModeLogin.Login)}>
               Ingresar
            </button>

            <button onClick={() => setModeCard(EModeLogin.Register)} className={validateStylesByMode(EModeLogin.Register)}>
               Registrarse
            </button>
         </div>

         <div className='w-full p-5'>{modeCard === EModeLogin.Login ? <FormLogin /> : <FormRegister />}</div>
      </div>
   );
}
