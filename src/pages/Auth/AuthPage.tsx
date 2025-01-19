import { AuthCard } from '@/components';

export function AuthPage(): React.JSX.Element {
   return (
      <div className='relative h-full w-full flex flex-col justify-center items-center gap-3 xl:flex-row xl:justify-around'>
         <img src='/wallpapers/login.png' alt='login-wallpaper' className='h-fit w-[180px] xl:w-[400px]' />

         <AuthCard />
      </div>
   );
}
