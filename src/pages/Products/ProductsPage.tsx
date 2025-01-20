import { Oval, Select, FilterProducts, CardProduct, ModalFormProduct } from '@/components';
import { IResponseGetAllProducts } from '@/services/endpoints/product/product.interface';
import { Pagination, SelectChangeEvent, ThemeProvider } from '@mui/material';
import productService from '@/services/endpoints/product/product.service';
import { ESortBy } from './ProductPage.interface';
import { useEffect, useState } from 'react';
import { theme } from '@/utils';

export function ProductsPage() {
   // Configuration
   const sortOptions = [
      { value: ESortBy.AlphabeticalAsc, label: 'Alfabético (A-Z)' },
      { value: ESortBy.AlphabeticalDesc, label: 'Alfabético (Z-A)' },
      { value: ESortBy.PriceAsc, label: 'Precio (Menor a Mayor)' },
      { value: ESortBy.PriceDesc, label: 'Precio (Mayor a Menor)' }
   ];

   const pageSize: number = 9;

   // States
   const [products, setProducts] = useState<IResponseGetAllProducts[]>([]);

   const [loading, setLoading] = useState<boolean>(false);

   const [sortBy, setSortBy] = useState<ESortBy | null>(null);

   const [currentPage, setCurrentPage] = useState<number>(1);

   const [productsToShow, setProductsToShow] = useState<IResponseGetAllProducts[]>([]);

   const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);

   // Effects
   useEffect(() => {
      getAllProduct();
   }, []);

   useEffect(() => {
      if (products.length > 0) {
         sortProducts([...products]);
      }
   }, [sortBy]);

   useEffect(() => {
      handlePagination();
   }, [products, currentPage]);

   // Methods
   const getAllProduct = async (): Promise<void> => {
      setLoading(true);

      const responseApiGetAllProducts: IResponseGetAllProducts[] | null = await productService.getAll();

      if (responseApiGetAllProducts && responseApiGetAllProducts.length > 0) {
         sortProducts(responseApiGetAllProducts);

         setCurrentPage(1);
      }

      setLoading(false);
   };

   const sortProducts = (productsToSort: IResponseGetAllProducts[]) => {
      const sortedProducts = productsToSort.sort((a, b) => {
         switch (sortBy) {
            case ESortBy.AlphabeticalAsc:
               return a.title.localeCompare(b.title);

            case ESortBy.AlphabeticalDesc:
               return b.title.localeCompare(a.title);

            case ESortBy.PriceAsc:
               return a.price - b.price;

            case ESortBy.PriceDesc:
               return b.price - a.price;

            default:
               return 0;
         }
      });

      setProducts(sortedProducts);
   };

   const handlePagination = () => {
      if (products.length === 0) {
         setProductsToShow([]);
         return;
      }

      // Calculate total pages based on product count and page size.
      const totalPages = Math.ceil(products.length / pageSize);

      // Adjust current page if it exceeds the total available pages.
      if (currentPage > totalPages) {
         setCurrentPage(Math.max(totalPages, 1));

         return;
      }

      // Get the subset of products for the current page.
      const startIndex = (currentPage - 1) * pageSize;

      setProductsToShow([...products.slice(startIndex, startIndex + pageSize)]);
   };

   return (
      <div className='h-fit w-full flex flex-col gap-6'>
         <FilterProducts products={products} setProducts={setProducts} getProducts={getAllProduct} />

         <Select
            label='Ordenar por:'
            options={sortOptions.map((option) => ({ label: option.label, value: option.value }))}
            value={sortBy ?? ''}
            onChange={(event: SelectChangeEvent<string>) => {
               setSortBy(event.target.value as ESortBy);
            }}
            hFit
         />

         {loading ? (
            <div className='h-[60vh] w-full flex justify-center items-center'>
               <Oval size={40} />
            </div>
         ) : (
            <>
               <div className='flex flex-wrap gap-[2%] gap-y-6'>
                  {productsToShow.map((product: IResponseGetAllProducts) => (
                     <CardProduct key={product.id} product={product} getProducts={getAllProduct} />
                  ))}
               </div>

               <div className='flex justify-center mb-3'>
                  <ThemeProvider theme={theme}>
                     <Pagination
                        count={Math.ceil(products.length / pageSize)}
                        page={currentPage}
                        onChange={(_, page) => setCurrentPage(page)}
                        color='primary'
                     />
                  </ThemeProvider>
               </div>
            </>
         )}

         <button
            onClick={() => setOpenModalCreate(true)}
            className='fixed bottom-[5vh] right-[5vw] bg-black p-3 rounded-md flex flex-col gap-1 items-center font-semibold text-white text-[18px] hover:bg-green-500'>
            <span>Crear</span>

            <span>Producto</span>
         </button>

         <ModalFormProduct open={openModalCreate} setOpen={setOpenModalCreate} getProducts={getAllProduct} />
      </div>
   );
}
