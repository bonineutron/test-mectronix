import { AuthPage, HomePage, ProductsPage, ShoppingPage } from '@/pages';
import { Routes, Route, Navigate } from 'react-router';
import { ROUTE_NAMES } from '@/constants';

export function Router(): JSX.Element {
   const { HOME, AUTH, PRODUCTS, SHOPPING } = ROUTE_NAMES;

   return (
      <Routes>
         <Route path='*' element={<Navigate to='/' />} />

         <Route path={HOME} element={<HomePage />} />

         <Route path={AUTH} element={<AuthPage />} />

         <Route path={PRODUCTS} element={<ProductsPage />} />

         <Route path={SHOPPING} element={<ShoppingPage />} />
      </Routes>
   );
}
