import { objectDecrypt, objectEncrypt } from './encrypt-object.utility';

export function setLocalStorage<T>(item: string, value: T) {
   const encryptValue: string | null = objectEncrypt<T>(value);

   if (encryptValue) {
      localStorage.setItem(item, encryptValue);

      return;
   }

   console.error('Data could not be encrypted');

   localStorage.setItem(item, JSON.stringify(value));
}

export function getLocalStorage<T>(item: string): T | null {
   const getItemLocalStorage: string | null = localStorage.getItem(item);

   if (getItemLocalStorage) {
      const decryptValue: T | null = objectDecrypt<T>(getItemLocalStorage);

      if (!decryptValue) {
         const valueLocalStorage: T = JSON.parse(getItemLocalStorage);

         console.error('Data will not be decrypted');

         return valueLocalStorage;
      }

      return decryptValue;
   }

   return null;
}
