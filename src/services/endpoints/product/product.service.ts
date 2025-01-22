import { openAlert } from '@/redux/features/alert-dialog/alert-dialog.slice';
import { IResponseGetAllProducts } from './product.interface';
import { getLocalStorage, setLocalStorage } from '@/utils';
import { IResponseApi } from '@/services/api.interface';
import { ETypeAlertDialog } from '@/components';
import apiService from '@/services/api.service';
import { Dispatch } from '@reduxjs/toolkit';

class productService {
   private dispatch: Dispatch | null = null;

   public setHooks(dispatch: Dispatch) {
      this.dispatch = dispatch;
   }

   public async getAll(): Promise<IResponseGetAllProducts[] | null> {
      const response: IResponseApi<IResponseGetAllProducts[]> = await apiService.get('/products');

      if (!this.dispatch) {
         console.error('Add dispatch hook in App component.');

         return null;
      }

      if (response.error) {
         this.dispatch(
            openAlert({
               type: ETypeAlertDialog.Error,
               description: 'Ha ocurrido un error.'
            })
         );

         return null;
      }

      const storedProductsLS = getLocalStorage<string>('products');

      const addNewProp = response.data?.map((product) => ({ ...product }));

      if (!storedProductsLS) {
         setLocalStorage('products', JSON.stringify(response.data));

         return response.data;
      }

      const storedProducts: IResponseGetAllProducts[] = storedProductsLS ? JSON.parse(storedProductsLS) : [];

      const addNewPropLS = storedProducts.map((product) => ({ ...product }));

      const apiProducts: IResponseGetAllProducts[] = (addNewProp || []).filter((apiProduct) =>
         addNewPropLS.some((localProduct) => localProduct.id === apiProduct.id)
      );

      const mergedProducts = addNewPropLS.map((localProduct) => {
         const apiProduct = apiProducts.find((product) => product.id === localProduct.id);

         return apiProduct ? { ...localProduct } : localProduct;
      });

      setLocalStorage('products', JSON.stringify(mergedProducts));

      return mergedProducts;
   }

   public async getCategories(): Promise<string[] | null> {
      const responseGetCategories: IResponseApi<string[]> = await apiService.get('/products/categories');

      if (this.dispatch) {
         if (responseGetCategories.error) {
            this.dispatch(
               openAlert({
                  type: ETypeAlertDialog.Error,
                  description: 'Ha ocurrido un error.'
               })
            );

            return null;
         }

         if (responseGetCategories.data && responseGetCategories.data.length > 0) {
            return responseGetCategories.data;
         }
      }

      console.error('Add dispatch hook in App component.');

      return null;
   }
}

export default new productService();
