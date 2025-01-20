import { Oval as OvalLib } from 'react-loader-spinner';

interface OvalProps {
   size?: number;
}

export function Oval({ size }: OvalProps) {
   return (
      <OvalLib
         height={size ?? '20'}
         width={size ?? '20'}
         strokeWidth={6}
         color='#000000'
         secondaryColor='#00000080'
      />
   );
}
