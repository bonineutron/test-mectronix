import { Routes, Route, Navigate } from 'react-router';
import { ROUTE_NAMES } from '@/constants';
import { AuthPage } from '@/pages';

export function Router(): JSX.Element {
   const { HOME, AUTH } = ROUTE_NAMES;

   return (
      <Routes>
         <Route path='*' element={<Navigate to='/' />} />

         <Route path={HOME} element={<div className='bg-red-200 h-[1000px]'>Home</div>} />

         <Route path={AUTH} element={<AuthPage />} />
      </Routes>
   );
}
