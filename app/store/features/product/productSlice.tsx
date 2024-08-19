//counterSlice.jsx

"use client"; //this is a client side component

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/app/models/ui/Product";

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action: PayloadAction<Product>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id,
      );
    },
  },
});

export const { addProduct, removeProduct } = productSlice.actions;

export default productSlice.reducer;
