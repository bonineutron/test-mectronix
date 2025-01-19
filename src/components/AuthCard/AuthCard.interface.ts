import { IField } from '@/interfaces';

export interface IFormLogin {
   email: IField<string>;
   password: IField<string>;
}

export interface IFormRegister {
   email: IField<string>;
   userName: IField<string>;
   password: IField<string>;
   confirmPassword: IField<string>;
}
