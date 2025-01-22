import { IField } from '@/interfaces';

export interface IFormProduct {
   title: IField<string>;
   price: IField<number | null>;
   description: IField<string>;
   category: IField<string>;
   image: IField<string>;
   count: IField<number | null>;
}
