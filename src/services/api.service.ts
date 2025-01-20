import { openAlert } from '@/redux/features/alert-dialog/alert-dialog.slice';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { ETypeAlertDialog } from '@/components';
import { IResponseApi } from './api.interface';
import { Dispatch } from '@reduxjs/toolkit';

const axiosInstance = axios.create({
   baseURL: import.meta.env.VITE_API_URL
});

class apiService {
   constructor() {
      this.initInterceptor();
   }

   private defaultHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
   };

   private dispatch: Dispatch | null = null;

   private initInterceptor(): void {
      axiosInstance.interceptors.request.use(
         (config) => {
            // const tokenApi: string = import.meta.env.VITE_API_TOKEN_USERS;

            // if (tokenApi) {
            //    config.headers['Authorization'] = `Bearer ${tokenApi}`;
            // }

            return config;
         },

         (error) => {
            return Promise.reject(error);
         }
      );

      axiosInstance.interceptors.response.use(
         (response) => {
            return response;
         },

         (error) => {
            if (this.dispatch) {
               if (error.response.status === 500) {
                  this.dispatch(openAlert({ type: ETypeAlertDialog.Error, description: 'Error en servidor.' }));
               }
            }

            return Promise.reject(error);
         }
      );
   }

   private isAxiosError(error: unknown): error is AxiosError {
      return (error as AxiosError)?.isAxiosError === true;
   }

   private handleRequestError<T>(error: unknown): IResponseApi<T> {
      if (this.isAxiosError(error)) {
         return { data: null, error: true, status: error.response?.status || 500 };
      }

      return { data: null, error: true };
   }

   public setHooks(dispatch: Dispatch) {
      this.dispatch = dispatch;
   }

   public async get<T>(url: string, customHeaders?: Record<string, string>): Promise<IResponseApi<T>> {
      try {
         const response: AxiosResponse<T> = await axiosInstance.get(url, {
            headers: { ...this.defaultHeaders, ...customHeaders }
         });

         return { data: response.data, error: false, status: response.status };
      } catch (error: unknown) {
         return this.handleRequestError<T>(error);
      }
   }

   public async post<T, K>(url: string, body?: K, customHeaders?: Record<string, string>): Promise<IResponseApi<T>> {
      try {
         const response: AxiosResponse<T> = await axiosInstance.post(url, body, {
            headers: { ...this.defaultHeaders, ...customHeaders }
         });

         return { data: response.data, error: false, status: response.status };
      } catch (error: unknown) {
         return this.handleRequestError<T>(error);
      }
   }

   public async put<T, K>(url: string, body?: K, customHeaders?: Record<string, string>): Promise<IResponseApi<T>> {
      try {
         const response: AxiosResponse<T> = await axiosInstance.put(url, body, {
            headers: { ...this.defaultHeaders, ...customHeaders }
         });

         return { data: response.data, error: false, status: response.status };
      } catch (error: unknown) {
         return this.handleRequestError<T>(error);
      }
   }

   public async patch<T, K>(url: string, body?: K, customHeaders?: Record<string, string>): Promise<IResponseApi<T>> {
      try {
         const response: AxiosResponse<T> = await axiosInstance.patch(url, body, {
            headers: { ...this.defaultHeaders, ...customHeaders }
         });

         return { data: response.data, error: false, status: response.status };
      } catch (error: unknown) {
         return this.handleRequestError<T>(error);
      }
   }

   public async delete<T, K>(url: string, body?: K, customHeaders?: Record<string, string>): Promise<IResponseApi<T>> {
      try {
         const response: AxiosResponse<T> = await axiosInstance.delete(url, {
            data: body,
            headers: { ...this.defaultHeaders, ...customHeaders }
         });

         return { data: response.data, error: false, status: response.status };
      } catch (error: unknown) {
         return this.handleRequestError<T>(error);
      }
   }
}

export default new apiService();
