import { Button as LoadingButton } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import { theme } from '@/utils';

interface ButtonProps {
   onClick?: () => void;
   children: React.ReactNode;
   submit?: boolean;
   loading?: boolean;
   disabled?: boolean;
   className?: string;
   secondary?: boolean;
   icon?: JSX.Element;
   fullWidth?: boolean;
   error?: boolean;
}

export function Button({
   onClick,
   children,
   submit,
   loading,
   className,
   secondary,
   icon,
   disabled,
   fullWidth,
   error
}: ButtonProps): React.JSX.Element {
   return (
      <div className={`h-fit w-fit ${disabled ? 'cursor-not-allowed' : ''} ${fullWidth ? 'w-full' : 'w-fit'}`}>
         <ThemeProvider theme={theme}>
            <LoadingButton
               type={submit ? 'submit' : 'button'}
               onClick={onClick}
               variant='contained'
               loading={loading}
               disabled={disabled}
               color={error ? 'error' : secondary ? 'secondary' : 'primary'}
               className={`!h-[40px] !text-[16px] !shadow-none !normal-case !rounded-md !border-solid !border-[1px] w-full ${className ?? ''}`}>
               {icon && <p className='min-w-[20px] text-[20px] mr-1'>{icon}</p>}

               <span>{children}</span>
            </LoadingButton>
         </ThemeProvider>
      </div>
   );
}
