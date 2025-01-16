/** @type {import('tailwindcss').Config} */

import { customApp } from './src/shared/constants';

export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      extend: {
         colors: {
            'primary-color': customApp.primaryColor,
            'secondary-color': customApp.secondaryColor,
            'gray-dark': customApp.grayDark
         }
      }
   },
   plugins: []
};
