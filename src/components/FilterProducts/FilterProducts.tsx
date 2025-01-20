import { IResponseGetAllProducts } from '@/services/endpoints/product/product.interface';
import productService from '@/services/endpoints/product/product.service';
import { IFormFilterProducts } from './FilterProducts.interface';
import Slider from '@/components/form-inputs/Slider/Slider';
import { Button, Input, Select } from '@/components';
import { SelectChangeEvent } from '@mui/material';
import { RiResetLeftFill } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import { MdSearch } from 'react-icons/md';

export interface IFilterProductsProps {
   products: IResponseGetAllProducts[];
   setProducts: React.Dispatch<React.SetStateAction<IResponseGetAllProducts[]>>;
   getProducts: () => Promise<void>;
}

export function FilterProducts({ products, setProducts, getProducts }: IFilterProductsProps): React.JSX.Element {
   // States
   const [formProducts, setFormProducts] = useState<IFormFilterProducts>({
      category: '',
      minPrice: null,
      maxPrice: null,
      rate: 5
   });

   const [categories, setCategories] = useState<string[]>([]);

   // Effects
   useEffect(() => {
      getCategories();
   }, []);

   // Methods
   const getCategories = async (): Promise<void> => {
      const responseGetCategories = await productService.getCategories();

      if (responseGetCategories && responseGetCategories.length > 0) {
         setCategories(responseGetCategories);
      }
   };

   const filterProducts = () => {
      let filteredProducts = products;

      if (formProducts.category) {
         filteredProducts = filteredProducts.filter((product) => product.category === formProducts.category);
      }

      if (formProducts.minPrice !== null) {
         filteredProducts = filteredProducts.filter((product) => product.price >= formProducts.minPrice!);
      }

      if (formProducts.maxPrice !== null) {
         filteredProducts = filteredProducts.filter((product) => product.price <= formProducts.maxPrice!);
      }

      if (formProducts.rate) {
         filteredProducts = filteredProducts.filter((product) => product.rating.rate <= formProducts.rate);
      }

      setProducts(filteredProducts);
   };

   const resetForm = () => {
      setFormProducts({
         category: '',
         minPrice: null,
         maxPrice: null,
         rate: 5
      });

      getProducts();
   };

   const validateShowDeleteButton = (): boolean => {
      if (formProducts.category) {
         return true;
      }

      if (formProducts.minPrice) {
         return true;
      }

      if (formProducts.maxPrice) {
         return true;
      }

      if (formProducts.rate < 5) {
         return true;
      }

      return false;
   };

   return (
      <div className='h-fit w-full p-3 pt-6 bg-white shadow-md rounded-md border-[1px] border-gray-100 '>
         <div className='flex gap-[2%] flex-wrap'>
            <Select
               label='Categoría'
               options={categories.map((category) => ({ label: category, value: category }))}
               value={formProducts.category}
               onChange={(event: SelectChangeEvent<string>) => {
                  setFormProducts((prevState) => ({ ...prevState, category: event.target.value }));
               }}
            />

            <Input
               id='minPrice'
               name='minPrice'
               type='number'
               label='Precio minimo'
               value={formProducts.minPrice !== null ? String(formProducts.minPrice) : ''}
               onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setFormProducts((prevState) => ({ ...prevState, minPrice: Number(event.target.value) }));
               }}
            />

            <Input
               id='maxPrice'
               name='maxPrice'
               type='number'
               label='Precio máximo'
               value={formProducts.maxPrice !== null ? String(formProducts.maxPrice) : ''}
               onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setFormProducts((prevState) => ({ ...prevState, maxPrice: Number(event.target.value) }));
               }}
            />

            <Slider
               label='Calificación'
               value={formProducts.rate}
               onChange={(event: number) => {
                  setFormProducts((prevState) => ({ ...prevState, rate: event }));
               }}
               max={5}
               marks={true}
            />
         </div>

         <div className='w-full flex justify-end items-center gap-3'>
            {validateShowDeleteButton() && (
               <Button onClick={resetForm} icon={<RiResetLeftFill />} secondary>
                  Resetear
               </Button>
            )}

            <Button onClick={() => filterProducts()} icon={<MdSearch />}>
               Buscar
            </Button>
         </div>
      </div>
   );
}
