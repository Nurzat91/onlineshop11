import { ApiProductsGet, Product} from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import { createProduct, fetchOneProducts, fetchProducts } from './productsThunks';

interface ProductsState {
  items: Product[];
  item: ApiProductsGet | null;
  fetchLoading: boolean;
  createLoading: boolean;
  fetchOneLoading: boolean;
}

const initialState: ProductsState = {
  items: [],
  item: null,
  fetchLoading: false,
  createLoading: false,
  fetchOneLoading: false,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, {payload: products}) => {
      state.fetchLoading = false;
      state.items = products;
    });

    builder.addCase(createProduct.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createProduct.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createProduct.rejected, (state) => {
      state.createLoading = false;
    });

    builder.addCase(fetchOneProducts.pending, (state) => {
      state.fetchOneLoading = true;
    });
    builder.addCase(fetchOneProducts.fulfilled, (state, {payload: data}: PayloadAction<ApiProductsGet>) => {
      state.fetchOneLoading = false;
      state.item = data;
    });
    builder.addCase(fetchOneProducts.rejected, (state) => {
      state.fetchOneLoading = false;
    });
  },
});

export const productsReducer = productsSlice.reducer;
export const selectProducts = (state: RootState) => state.products.items;
export const selectOnePost = (state: RootState) => state.products.item;
export const selectProductsLoading = (state: RootState) => state.products.fetchLoading;
export const selectProductCreating = (state: RootState) => state.products.createLoading;
export const selectProductOnefetch = (state: RootState) => state.products.fetchOneLoading;