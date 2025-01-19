import authService from './services/endpoints/auth/auth.service';
import apiService from './services/api.service';
import { useDispatch } from 'react-redux';
import { Layout } from './components';
import { Router } from './router';
import { useEffect } from 'react';

export default function App() {
   // Configuration
   const dispatch = useDispatch();

   // Effects
   useEffect(() => {
      apiService.setHooks(dispatch);
      authService.setHooks(dispatch);
   }, []);

   return (
      <Layout>
         <Router />
      </Layout>
   );
}
