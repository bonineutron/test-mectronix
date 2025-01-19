import { Theme, createTheme } from '@mui/material';
import { CUSTOM_APP } from '@/constants';

export const theme: Theme = createTheme({
   palette: {
      primary: {
         main: CUSTOM_APP.PRIMARY_COLOR
      },
      secondary: {
         main: CUSTOM_APP.SECONDARY_COLOR
      }
   },
   typography: {
      fontFamily: 'Open Sans, sans-serif',
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 600,
      fontWeightBold: 700
   },
   components: {
      MuiButton: {
         styleOverrides: {
            root: {
               color: 'white'
            }
         }
      }
   }
});
