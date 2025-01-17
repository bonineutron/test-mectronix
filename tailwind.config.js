/** @type {import('tailwindcss').Config} */

import { CUSTOM_APP } from './src/constants';

export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      extend: {
         colors: {
            'primary-color': CUSTOM_APP.PRIMARY_COLOR,
            'secondary-color': CUSTOM_APP.SECONDARY_COLOR,
            'gray-dark': CUSTOM_APP.GRAY_DARK
         }
      }
   },
   plugins: []
};
