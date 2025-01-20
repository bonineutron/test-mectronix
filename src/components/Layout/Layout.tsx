import { AlertDialog, Footer, RootComponent, SideBarDesktop, TopBar } from '@/components';
import { useLocation, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { ROUTE_NAMES } from '@/constants';
import { useEffect } from 'react';

interface LayoutProps {
   children: React.ReactNode;
}

export function Layout({ children }: LayoutProps): JSX.Element {
   // Configuration
   const navigate = useNavigate();

   const location = useLocation();

   const pathname = location.pathname;

   const { AUTH } = ROUTE_NAMES;

   // Redux states
   const { id: user } = useSelector((state: RootState) => state.user);

   // Effects
   useEffect(() => {
      validateNavigateUserSession();
   }, [user, pathname]);

   // Methods
   const validateNavigateUserSession = () => {
      if (!user) {
         navigate(AUTH);
      }

      if (user && pathname === AUTH) {
         navigate('/');
      }
   };

   // Return JSX to login page.
   if (!user && pathname === AUTH) {
      return (
         <div className='h-screen w-screen overflow-hidden bg-gray-50'>
            <div className='relative h-full w-full'>{children}</div>

            <AlertDialog />
         </div>
      );
   }

   // Return JSX to exist user session.
   if (user && pathname !== AUTH) {
      return (
         <div className='h-screen w-screen flex overflow-hidden bg-gray-50'>
            <SideBarDesktop />

            <div className='h-full w-full flex flex-col overflow-x-hidden'>
               <TopBar />

               <div className='h-full w-full flex flex-col justify-between items-center'>
                  <div className='h-fit w-full max-w-[1200px] p-3 md:p-6'>{children}</div>

                  <Footer />
               </div>
            </div>

            <AlertDialog />
         </div>
      );
   }

   return <RootComponent />;
}
