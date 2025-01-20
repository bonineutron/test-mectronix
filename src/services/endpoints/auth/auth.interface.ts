export interface IResponseUser {
   address: Address;
   id: number;
   email: string;
   username: string;
   password: string;
   name: Name;
   phone: string;
   __v: number;
}

export interface Name {
   firstname: string;
   lastname: string;
}

export interface Address {
   geolocation: Geolocation;
   city: string;
   street: string;
   number: number;
   zipcode: string;
}

export interface Geolocation {
   lat: string;
   long: string;
}

export interface IBodyCreateUser {
   email: string;
   username: string;
   password: string;
   name: {
      firstname: string;
      lastname: string;
   };
   address: {
      city: string;
      street: string;
      number: number;
      zipcode: string;
      geolocation: {
         lat: string;
         long: string;
      };
   };
   phone: string;
}

export interface IParamsLogin {
   email: string;
   password: string;
}

export interface IParamsRegister {
   email: string;
   userName: string;
   password: string;
}
