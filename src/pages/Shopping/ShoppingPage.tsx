import { IResponseGetAllProducts } from '@/services/endpoints/product/product.interface';
import productService from '@/services/endpoints/product/product.service';
import { RootState } from '@/redux/store';
import { getLocalStorage } from '@/utils';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Oval } from '@/components';

export function ShoppingPage() {
   // Configuration
   const getPurchasedLS = getLocalStorage('purchased');

   // Redux states
   const { id: user } = useSelector((state: RootState) => state.user);

   // States
   const [products, setProducts] = useState<IResponseGetAllProducts[]>([]);

   const [loading, setLoading] = useState<boolean>(false);

   // Effects
   useEffect(() => {
      getAllProduct();
   }, []);

   // Methods
   const getAllProduct = async (): Promise<void> => {
      setLoading(true);

      const responseApiGetAllProducts: IResponseGetAllProducts[] | null = await productService.getAll();

      if (responseApiGetAllProducts && responseApiGetAllProducts.length > 0) {
         validateProducts(responseApiGetAllProducts);
      }

      setLoading(false);
   };

   const validateProducts = (productsToValidate: IResponseGetAllProducts[]) => {
      if (getPurchasedLS && user) {
         const purchased = JSON.parse(getPurchasedLS as string);

         if (purchased[user]) {
            const filterProducts = productsToValidate.filter((product) => purchased[user].includes(product.id));

            setProducts(filterProducts);
         }
      }
   };

   return (
      <div className='w-full text-center flex flex-col gap-6'>
         {loading ? (
            <div className='h-[60vh] w-full flex justify-center items-center'>
               <Oval size={40} />
            </div>
         ) : (
            products.map((product) => (
               <div key={product.id} className='w-full bg-white p-3 rounded-md shadow-md text-left flex gap-3'>
                  <img src={product.image} alt={product.title} className='h-full w-full max-h-[80px] max-w-[80px] object-cover' />

                  <div className='flex flex-col gap-2'>
                     <p className='font-semibold'>{product.title}</p>

                     <p className='line-clamp-5'>{product.description}</p>
                  </div>
               </div>
            ))
         )}

         {!loading && products.length === 0 && 'Sin compras'}
      </div>
   );
}
