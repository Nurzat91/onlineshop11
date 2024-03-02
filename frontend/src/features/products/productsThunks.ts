import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiProductsGet, Product, ProductMutation } from '../../types';
import axiosApi from '../../axiosApi';
import { RootState } from '../../app/store';

export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchAll',
  async () => {
    const dishesResponse = await axiosApi.get<Product[]>('/products');
    return dishesResponse.data;
  }
);

export const createProduct = createAsyncThunk<void, ProductMutation, {state: RootState}>(
  'products/create',
  async (productMutation, {getState}) => {
    const token = getState().users.user?.token;
    const formData = new FormData();

    const keys = Object.keys(productMutation) as (keyof ProductMutation)[];
    keys.forEach(key => {
      const value = productMutation[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    return axiosApi.post('/products', formData, {headers: {'Authorization': 'Bearer ' + token}});
  }
);

export const fetchOneProducts = createAsyncThunk<ApiProductsGet, string>(
  'products/fetchOne',
  async (id) => {
    const response = await axiosApi.get<ApiProductsGet | null>('/products/' + id);

    if (response.data === null) {
      throw new Error('Not found');
    }

    return response.data;
  }
);

export const deleteProduct = createAsyncThunk<void, string>(
  'products/delete',
  async (id) => {
    await axiosApi.delete(`/products/${id}`);
  }
);
