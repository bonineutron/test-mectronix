import productService from './endpoints/product/product.service';
import authService from './endpoints/auth/auth.service';
import { Dispatch } from '@reduxjs/toolkit';
import apiService from './api.service';

export const setServiceHooks = (dispatch: Dispatch) => {
   const services = [apiService, authService, productService];

   services.forEach((service) => service.setHooks(dispatch));
};
