import { IResponseGetAllProducts } from '@/services/endpoints/product/product.interface';
import { getLocalStorage, inputChange, inputError, setLocalStorage } from '@/utils';
import productService from '@/services/endpoints/product/product.service';
import { Button, Input, Modal, Select } from '@/components';
import { IFormProduct } from './ModalFormProduct.interface';
import { MdDriveFolderUpload } from 'react-icons/md';
import { useEffect, useRef, useState } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { IoMdAddCircle } from 'react-icons/io';
import { FaSave } from 'react-icons/fa';

export interface IModalFormProductProps {
   open: boolean;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
   product?: IResponseGetAllProducts;
   getProducts: () => Promise<void>;
}

export function ModalFormProduct({ open, setOpen, product, getProducts }: IModalFormProductProps): React.JSX.Element {
   // Configuration
   const fileInputRef = useRef<HTMLInputElement | null>(null);

   // States
   const [formProduct, setFormProduct] = useState<IFormProduct>({
      title: { value: '' },
      price: { value: null },
      description: { value: '' },
      category: { value: '' },
      image: { value: '' }
   });

   const [categories, setCategories] = useState<string[]>([]);

   // Effects
   useEffect(() => {
      getCategories();
   }, []);

   useEffect(() => {
      if (product) {
         setFormProduct({
            title: { value: product.title },
            price: { value: product.price },
            description: { value: product.description },
            category: { value: product.category },
            image: { value: product.image }
         });
      }
   }, [product]);

   // Methods
   const getCategories = async (): Promise<void> => {
      const responseGetCategories = await productService.getCategories();

      if (responseGetCategories && responseGetCategories.length > 0) {
         setCategories(responseGetCategories);
      }
   };

   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (file) {
         const reader = new FileReader();

         reader.onload = (e) => {
            if (e.target?.result) {
               setFormProduct((prevState) => ({ ...prevState, image: { value: e?.target?.result as string } }));
            }
         };

         reader.readAsDataURL(file);
      }
   };

   const handleButtonClick = () => {
      fileInputRef.current?.click();
   };

   const formDataFailed = (): boolean => {
      let failed: boolean = false;

      if (!formProduct.image.value) {
         inputError<IFormProduct>(setFormProduct, 'image', 'Imagen requerida');

         failed = true;
      }

      if (!formProduct.title.value) {
         inputError<IFormProduct>(setFormProduct, 'title');

         failed = true;
      }

      if (!formProduct.description.value) {
         inputError<IFormProduct>(setFormProduct, 'description');

         failed = true;
      }

      if (!formProduct.price.value) {
         inputError<IFormProduct>(setFormProduct, 'price');

         failed = true;
      }

      if (!formProduct.category.value) {
         inputError<IFormProduct>(setFormProduct, 'category');

         failed = true;
      }

      return failed;
   };

   const createProduct = () => {
      if (formDataFailed()) {
         return;
      }

      const getProductsLS: string | null = getLocalStorage<string>('products');

      let productsLS: IResponseGetAllProducts[] = [];

      if (getProductsLS) {
         productsLS = JSON.parse(getProductsLS);
      }

      const newProduct: IResponseGetAllProducts = {
         id: productsLS.length > 0 ? productsLS[productsLS.length - 1].id + 1 : 1,
         title: formProduct.title.value,
         price: formProduct.price.value || 0,
         description: formProduct.description.value,
         category: formProduct.category.value,
         image: formProduct.image.value,
         rating: {
            rate: 0,
            count: 0
         }
      };

      productsLS.push(newProduct);

      setLocalStorage('products', JSON.stringify(productsLS));

      resetForm();

      getProducts();

      setOpen(false);
   };

   const editProduct = (productId: number) => {
      if (formDataFailed()) return;

      const storedProductsLS = getLocalStorage<string>('products');

      if (!storedProductsLS) return;

      const products: IResponseGetAllProducts[] = JSON.parse(storedProductsLS);

      const updatedProducts = products.map((product) => {
         if (product.id === productId) {
            return {
               ...product,
               title: formProduct.title.value,
               price: Number(formProduct.price.value) || 0,
               description: formProduct.description.value,
               category: formProduct.category.value,
               image: formProduct.image.value
            };
         }
         return product;
      });

      setLocalStorage('products', JSON.stringify(updatedProducts));

      resetForm();

      setOpen(false);

      getProducts();
   };

   const resetForm = () => {
      setFormProduct({
         title: { value: '' },
         price: { value: null },
         description: { value: '' },
         category: { value: '' },
         image: { value: '' }
      });
   };

   return (
      <Modal open={open} setOpen={setOpen} className='!w-[90%] max-h-[70%]'>
         <div className='w-full md:flex md:justify-between'>
            <div className='relative w-full md:w-[300px] mb-3'>
               <input type='file' ref={fileInputRef} accept='image/*' onChange={handleFileChange} className='hidden' multiple={false} />

               <img
                  src={formProduct.image.value || '/global/image-loading.svg'}
                  alt='preview'
                  className='w-full h-[300px] object-cover rounded-md border-[1px] border-gray-200 mb-3'
               />

               <Button onClick={handleButtonClick} icon={<MdDriveFolderUpload />} secondary>
                  Subir imagen
               </Button>

               <p className='absolute bottom-[70px] left-0 right-0 mx-auto w-fit text-red-600 text-[14px]'>
                  {formProduct.image.errorMessage}
               </p>
            </div>

            <div className='w-full md:max-w-[250px] mt-3'>
               <Input
                  id='title'
                  name='title'
                  type='text'
                  label='Titulo'
                  value={formProduct.title.value}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                     inputChange<IFormProduct, string>(setFormProduct, 'title', event.target.value);
                  }}
                  error={formProduct.title.error}
                  errorMessage={formProduct.title.errorMessage}
                  fullWidth
               />

               <Input
                  id='description'
                  name='description'
                  type='text'
                  label='Descripción'
                  value={formProduct.description.value}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                     inputChange<IFormProduct, string>(setFormProduct, 'description', event.target.value);
                  }}
                  error={formProduct.description.error}
                  errorMessage={formProduct.description.errorMessage}
                  fullWidth
               />

               <Input
                  id='price'
                  name='price'
                  type='number'
                  label='Precio'
                  value={formProduct.price.value !== null ? String(formProduct.price.value) : ''}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                     inputChange<IFormProduct, number>(setFormProduct, 'price', Number(event.target.value));
                  }}
                  error={formProduct.price.error}
                  errorMessage={formProduct.price.errorMessage}
                  fullWidth
               />

               <Select
                  label='Categoría'
                  options={categories.map((category) => ({ label: category, value: category }))}
                  value={formProduct.category.value}
                  onChange={(event: SelectChangeEvent<string>) => {
                     inputChange<IFormProduct, string>(setFormProduct, 'category', event.target.value);
                  }}
                  error={formProduct.category.error}
                  errorMessage={formProduct.category.errorMessage}
                  fullWidth
               />
            </div>
         </div>

         <div className='w-full flex justify-end'>
            {product ? (
               <Button onClick={() => editProduct(product.id)} icon={<FaSave />}>
                  Guardar
               </Button>
            ) : (
               <Button onClick={createProduct} icon={<IoMdAddCircle />}>
                  Crear
               </Button>
            )}
         </div>
      </Modal>
   );
}
