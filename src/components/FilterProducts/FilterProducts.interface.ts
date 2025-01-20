import { EProductCategory } from '@/pages';

export interface IFormFilterProducts {
   category: EProductCategory | string;
   minPrice: number | null;
   maxPrice: number | null;
   rate: number;
}
