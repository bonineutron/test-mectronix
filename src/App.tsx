import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Router } from './router';

export default function App() {
   return (
      <Provider store={store}>
         <BrowserRouter>
            <Router />
         </BrowserRouter>
      </Provider>
   );
}
