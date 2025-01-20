import { Modal as ModalMaterial } from '@mui/material';
import { MdClose } from 'react-icons/md';

interface ModalProps {
   open: boolean;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
   children: React.ReactNode;
   className?: string;
}

export function Modal({ open, setOpen, children, className }: ModalProps): JSX.Element {
   // Methods
   const handleClose = () => {
      setOpen(false);
   };

   return (
      <ModalMaterial
         open={open}
         onClose={handleClose}
         slotProps={{ backdrop: { timeout: 100, sx: { background: 'rgb(0 0 0 / 0.2)' } } }}
         className='!backdrop-blur-[2px] flex items-center justify-center'>
         <div
            className={`h-fit w-fit max-w-[90%] md:max-w-[700px] min-w-[200px] p-3 md:p-6 flex flex-col gap-3 rounded-md shadow-md bg-white ${className ?? ''}`}>
            <div className='flex items-center justify-end'>
               <button className='flex items-center text-red-500 md:hover:text-primary-gray' onClick={handleClose}>
                  <MdClose className='min-w-[24px] text-[24px]' />
               </button>
            </div>

            <div className='h-fit w-full overflow-y-auto'>{children}</div>
         </div>
      </ModalMaterial>
   );
}
