import { Link, useLocation, useNavigate } from 'react-router';
import { ProfileButton } from './ProfileButton/ProfileButton';
import { IoArrowBack } from 'react-icons/io5';
import { SideBarMobile } from '@/components';
import { useEffect, useState } from 'react';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { FiMenu } from 'react-icons/fi';
import { ROUTE_NAMES } from '@/constants';

export function TopBar(): JSX.Element {
   // Configuration
   const location = useLocation();

   const pathname = location.pathname;

   const navigate = useNavigate();

   const { HOME } = ROUTE_NAMES;

   // Redux states
   const { openSideBarDesktop } = useSelector((state: RootState) => state.sideBarDesktop);

   // States
   const [openMenuMobile, setOpenMenuMobile] = useState<boolean>(false);

   // Effects
   useEffect(() => {
      setOpenMenuMobile(false);
   }, [pathname]);

   return (
      <div className='sticky top-0 right-0 min-h-[60px] w-full bg-white shadow-md px-6 text-primary-gray z-[7]'>
         <div className='h-full w-full flex items-center justify-between'>
            <div className='h-full w-fit flex gap-6 md:gap-3 items-center '>
               {!openSideBarDesktop && (
                  <Link to='/' className='hidden md:block'>
                     <img src='/logos/google.png' alt='logo-google' className={`w-auto h-[50px]`} />
                  </Link>
               )}

               <button onClick={() => setOpenMenuMobile(true)} className='min-w-[24px] text-[24px] md:hidden'>
                  <FiMenu />
               </button>

               <button
                  onClick={() => navigate(-1)}
                  className='rounded-full md:p-[6px] md:hover:bg-light-gray disabled:text-gray-400'
                  disabled={pathname === HOME}>
                  <IoArrowBack className='w-[24px] text-[24px]' />
               </button>
            </div>

            <ProfileButton />
         </div>

         {openMenuMobile && <SideBarMobile setOpen={setOpenMenuMobile} />}
      </div>
   );
}
