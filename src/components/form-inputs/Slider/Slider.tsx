import { Slider as SliderMaterial, ThemeProvider } from '@mui/material';
import { theme, validateWidthInputs } from '@/utils';
import { useEffect, useState } from 'react';

export interface ISliderProps {
   label: string;
   value: number;
   onChange: (value: number) => void;
   min?: number;
   max?: number;
   step?: number;
   marks?: boolean;
   disabled?: boolean;
   fullWidth?: boolean;
   customWidth?: string;
}

export default function Slider({
   value,
   onChange,
   min,
   max,
   step,
   marks,
   label,
   disabled,
   fullWidth,
   customWidth
}: ISliderProps): React.JSX.Element {
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
   const handleChange = (_event: Event, newValue: number | number[]) => {
      if (typeof newValue === 'number') {
         onChange(newValue);
      }
   };

   return (
      <div style={{ width: validateWidthInputs(screenWidth, fullWidth, customWidth) }}>
         <p>{label}:</p>

         <div className='px-3'>
            <ThemeProvider theme={theme}>
               <SliderMaterial
                  size='medium'
                  value={value}
                  onChange={handleChange}
                  min={min}
                  max={max}
                  step={step}
                  marks={marks}
                  disabled={disabled}
                  valueLabelDisplay='auto'
                  className='w-full'
               />
            </ThemeProvider>
         </div>
      </div>
   );
}
