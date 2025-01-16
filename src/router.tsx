import { Routes, Route, Navigate } from 'react-router';
import { ROUTE_NAMES } from './shared/constants';

export function Router(): JSX.Element {
   const { HOME, LOGIN } = ROUTE_NAMES;

   return (
      <Routes>
         <Route path='*' element={<Navigate to='/' />} />

         <Route path={HOME} element={<>Home</>} />

         <Route path={LOGIN} element={<>Login</>} />
      </Routes>
   );
}
