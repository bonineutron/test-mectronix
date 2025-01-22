import { IResponseGetAllProducts } from '@/services/endpoints/product/product.interface';
import { EProductCategory } from '../../pages/Products/ProductPage.interface';
import { openAlert } from '@/redux/features/alert-dialog/alert-dialog.slice';
import { ModalFormProduct } from '../ModalFormProduct/ModalFormProduct';
import { getLocalStorage, setLocalStorage } from '@/utils';
import { Button, ETypeAlertDialog } from '@/components';
import { useDispatch, useSelector } from 'react-redux';
import { HiMiniShoppingBag } from 'react-icons/hi2';
import { MdDelete, MdEdit } from 'react-icons/md';
import { RootState } from '@/redux/store';
import { useState } from 'react';

export interface ICardProductProps {
   product: IResponseGetAllProducts;
   getProducts: () => Promise<void>;
}

export const CardProduct = ({ product, getProducts }: ICardProductProps): React.JSX.Element => {
   // Configuration
   const dispatch = useDispatch();

   // Redux states
   const { id: user } = useSelector((state: RootState) => state.user);

   // States
   const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);

   // Methods
   const validateCategoryComponent = (category: EProductCategory): JSX.Element => {
      const validateClass = (): string => {
         let customStyles = 'mb-3 border-[2px] w-fit px-2 py-1 rounded-md font-semibold';

         if (category == EProductCategory.MensClothing) {
            customStyles = `${customStyles} border-red-500 text-red-500`;
         }

         if (category == EProductCategory.Jewelery) {
            customStyles = `${customStyles} border-green-600 text-green-600`;
         }

         if (category == EProductCategory.Electronics) {
            customStyles = `${customStyles} border-blue-500 text-blue-500`;
         }

         if (category == EProductCategory.WomensClothing) {
            customStyles = `${customStyles} border-pink-500 text-pink-500`;
         }

         return customStyles;
      };

      return <p className={validateClass()}>{category}</p>;
   };

   const deleteProduct = () => {
      const storedProductsLS = getLocalStorage<string>('products');

      if (!storedProductsLS) return;

      const products: IResponseGetAllProducts[] = JSON.parse(storedProductsLS);

      const filterProducts = products.filter((productLS) => productLS.id !== product.id);

      setLocalStorage('products', JSON.stringify(filterProducts));

      getProducts();
   };

   const buyProduct = () => {
      if (user) {
         const storedData = getLocalStorage('purchased');

         const purchased = storedData ? JSON.parse(storedData as string) : {};

         if (purchased[user]) {
            if (!purchased[user].includes(product.id)) {
               purchased[user] = [...purchased[user], product.id];
            }
         } else {
            purchased[user] = [product.id];
         }

         setLocalStorage('purchased', JSON.stringify(purchased));

         dispatch(
            openAlert({
               type: ETypeAlertDialog.Success,
               description: 'Producto comprado.'
            })
         );
      }
   };

   return (
      <div className='h-fit w-full rounded-md bg-white shadow-md border-[1px] border-gray-100 sm:w-[49%] xl:w-[32%] overflow-hidden'>
         <img src={product.image} alt={product.description} className='h-[300px] w-full object-cover rounded-t-md mb-3' />

         <div className='px-3 pb-3'>
            <p className='text-[18px] font-semibold min-h-[57px] line-clamp-2 mb-3'>{product.title}</p>

            <p className='line-clamp-3 min-h-[77px] mb-3'>{product.description}</p>

            {validateCategoryComponent(product.category as EProductCategory)}

            <div className='flex items-center gap-3 text-gray-600'>
               <p className='font-semibold'>Calificación:</p>

               <p className='text-[18px]'>{product.rating.rate}</p>
            </div>

            <div className='flex items-center gap-3 mb-3'>
               <p className='font-semibold'>Precio:</p>

               <p className='text-[18px]'>{`$${product.price}`}</p>
            </div>

            <div className='flex items-center gap-3 mb-3'>
               <p className='font-semibold'>Cantidad:</p>

               <p className='text-[18px]'>{`${product.count}`}</p>
            </div>

            <div className='flex justify-between'>
               <div className='flex flex-col gap-1'>
                  <Button onClick={() => setOpenModalEdit(true)} icon={<MdEdit />}>
                     Editar
                  </Button>

                  <Button onClick={deleteProduct} icon={<MdDelete />} error>
                     Borrar
                  </Button>
               </div>

               <Button onClick={buyProduct} icon={<HiMiniShoppingBag />} secondary>
                  Comprar
               </Button>
            </div>
         </div>

         <ModalFormProduct open={openModalEdit} setOpen={setOpenModalEdit} product={product} getProducts={getProducts} />
      </div>
   );
};
