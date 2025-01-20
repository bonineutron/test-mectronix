import { useDispatch } from 'react-redux';
import { Layout } from './components';
import { Router } from './router';
import { useEffect } from 'react';
import { setServiceHooks } from './services/api.utility';

export default function App() {
   // Configuration
   const dispatch = useDispatch();

   // Effects
   useEffect(() => {
      setServiceHooks(dispatch);
   }, []);

   return (
      <Layout>
         <Router />
      </Layout>
   );
}
