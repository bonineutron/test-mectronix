import { IoSettingsOutline } from 'react-icons/io5';
import { IoIosArrowForward } from 'react-icons/io';
import styles from './NavigationLinks.module.scss';
import { AiOutlineHome } from 'react-icons/ai';
import { LuShoppingBag } from 'react-icons/lu';
import { TbShoppingCart } from 'react-icons/tb';
import { Link, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

export function NavigationLinks(): JSX.Element {
   // Configuration
   const location = useLocation();

   const pathname = location.pathname;

   // Redux tates
   const { openSideBarDesktop, isHovered } = useSelector((state: RootState) => state.sideBarDesktop);

   // States
   const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

   // Effects
   useEffect(() => {
      const handleResize = () => {
         setScreenWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);

      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   // Methods
   const validatePath = (currentPath: string, pathToValidate: string): string => {
      if (currentPath === pathToValidate) {
         return 'bg-primary-color hover:!bg-primary-color text-white';
      }

      return '';
   };

   // Styles
   const navigationLinkContainer = 'w-full min-h-[46px] px-4 flex items-center justify-between gap-3 rounded-r-full hover:bg-gray-200';

   const navigationLinkText = 'w-full text-[14px] leading-[18px] line-clamp-1 text-left';

   const navigationLinkIcon = 'min-w-[22px] text-[22px]';

   const navigationLinkIconArrow = 'min-w-[20px] text-[20px]';

   return (
      <div className='w-full h-full flex flex-col gap-1 justify-between'>
         <div className={`h-fit max-h-[480px] w-full overflow-y-auto ${styles.containerNavLinks}`}>
            <Link to='/' className={`${navigationLinkContainer} ${validatePath(pathname, '/')}`}>
               <AiOutlineHome className={`${navigationLinkIcon}`} />

               {(openSideBarDesktop || isHovered || screenWidth <= 768) && (
                  <>
                     <p className={`${navigationLinkText}`}>Inicio</p>

                     <IoIosArrowForward className={`${navigationLinkIconArrow}`} />
                  </>
               )}
            </Link>

            <Link to='/products' className={`${navigationLinkContainer} ${validatePath(pathname, '/products')}`}>
               <LuShoppingBag className={`${navigationLinkIcon}`} />

               {(openSideBarDesktop || isHovered || screenWidth <= 768) && (
                  <>
                     <p className={`${navigationLinkText}`}>Productos</p>

                     <IoIosArrowForward className={`${navigationLinkIconArrow}`} />
                  </>
               )}
            </Link>

            <Link to='/shopping' className={`${navigationLinkContainer} ${validatePath(pathname, '/shopping')}`}>
               <TbShoppingCart className={`${navigationLinkIcon}`} />

               {(openSideBarDesktop || isHovered || screenWidth <= 768) && (
                  <>
                     <p className={`${navigationLinkText}`}>Compras</p>

                     <IoIosArrowForward className={`${navigationLinkIconArrow}`} />
                  </>
               )}
            </Link>
         </div>

         <Link to='/configuration' className={`${navigationLinkContainer} ${validatePath(pathname, '/configuration')}`}>
            <IoSettingsOutline className={`${navigationLinkIcon}`} />

            {(openSideBarDesktop || isHovered || screenWidth <= 768) && (
               <>
                  <p className={`${navigationLinkText}`}>Configuración</p>

                  <IoIosArrowForward className={`${navigationLinkIconArrow}`} />
               </>
            )}
         </Link>
      </div>
   );
}
