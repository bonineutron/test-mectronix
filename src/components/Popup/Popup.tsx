import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { EPlacement } from './Popup.enum';
import { Popper } from '@mui/material';
import { useState } from 'react';

interface PopupProps {
   children: React.ReactNode;
   content: JSX.Element;
   placement?: EPlacement;
   classNameContent?: string;
   styleContent?: React.CSSProperties;
   hiddenOnClick?: boolean;
}

export function Popup({ children, placement, content, classNameContent, styleContent, hiddenOnClick }: PopupProps): JSX.Element {
   // States
   const [open, setOpen] = useState<boolean>(false);

   const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

   // Methods
   const handleClick = (): void => {
      setOpen((prev) => !prev);
   };

   const handleClickAway = (): void => {
      setOpen(false);
   };

   return (
      <ClickAwayListener onClickAway={handleClickAway}>
         <div ref={(element) => setAnchorEl(element)}>
            <div onClick={handleClick} className='cursor-pointer'>
               {children}
            </div>

            <Popper open={open} anchorEl={anchorEl} placement={placement ?? EPlacement.Bottom} className='z-[7]'>
               <div
                  onClick={hiddenOnClick ? handleClickAway : () => {}}
                  className={`p-4 m-1 rounded-md shadow-md bg-white border-[1px] border-gray-100 ${classNameContent ?? ''}`}
                  style={styleContent}>
                  {content}
               </div>
            </Popper>
         </div>
      </ClickAwayListener>
   );
}
