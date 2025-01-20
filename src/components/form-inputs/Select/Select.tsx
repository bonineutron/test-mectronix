import {
   FormControl,
   FormHelperText,
   InputLabel,
   MenuItem,
   SelectChangeEvent,
   Select as SelectMaterialUi,
   ThemeProvider
} from '@mui/material';
import { theme, validateWidthInputs } from '@/utils';
import { useEffect, useState } from 'react';

interface SelectProps {
   label: string;
   value: string;
   options: {
      label: string;
      value: string;
   }[];
   onChange: (event: SelectChangeEvent<string>) => void;
   onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
   error?: boolean;
   errorMessage?: string;
   fullWidth?: boolean;
   customWidth?: string;
   className?: string;
   messageVoid?: string;
   disabled?: boolean;
   hFit?: boolean;
}

export function Select({
   label,
   value,
   options,
   onChange,
   onBlur,
   error,
   errorMessage,
   fullWidth,
   customWidth,
   className,
   disabled,
   hFit
}: SelectProps): React.JSX.Element {
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

   return (
      <div
         className={`relative h-[72px] ${className ?? ''} ${hFit ? '!h-fit' : ''}`}
         style={{
            width: validateWidthInputs(screenWidth, fullWidth, customWidth),
            maxWidth: validateWidthInputs(screenWidth, fullWidth, customWidth)
         }}>
         <ThemeProvider theme={theme}>
            <FormControl error={error} fullWidth disabled={disabled}>
               <InputLabel size='small'>{options.length === 0 ? 'Cargando...' : label}</InputLabel>

               <SelectMaterialUi
                  value={value}
                  label={label}
                  size='small'
                  onChange={onChange}
                  MenuProps={{
                     PaperProps: {
                        style: {
                           maxHeight: 300,
                           width: 100
                        }
                     }
                  }}
                  onBlur={onBlur}>
                  {options.length > 0 &&
                     options.map((option, index) => (
                        <MenuItem key={index} value={option.value}>
                           {option.label}
                        </MenuItem>
                     ))}
               </SelectMaterialUi>

               {error && <FormHelperText error>{errorMessage ?? 'Valor requerido'}</FormHelperText>}
            </FormControl>
         </ThemeProvider>
      </div>
   );
}
