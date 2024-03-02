export interface LoginMutation {
  username: string;
  password: string;
}
export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  phoneNumber: string;
}

export interface User {
  _id: string;
  username: string;
  displayName: string;
  phoneNumber: string;
  token: string;
}
export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface RegisterResponse {
  user: User;
  message: string;
}

export interface GlobalError {
  error: string;
}

export interface Category {
  _id: string;
  title: string;
}

export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string | null;
  category: Category;
}

export interface ProductMutation {
  category: string;
  title: string;
  description: string;
  price: string;
  image: File | null;
}

export interface ProductsGet {
  _id: string;
  user: {
    _id: string,
    displayName: string,
    phoneNumber: string,
  };
  title: string;
  description: string;
  price: string;
  image: string | null;
  category: {
    _id: string,
    title: string;
  };
}
export type ApiProductsGet = Omit<ProductsGet, 'id'>;
