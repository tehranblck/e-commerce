"use client";

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
      const newProduct = action.payload;
      const existingProduct = state.products.find(product => product.id === newProduct.id);

      if (existingProduct) {
        existingProduct.quantity = (existingProduct.quantity || 0) + 1;
        existingProduct.selectedColor = newProduct.selectedColor;
        existingProduct.selectedSize = newProduct.selectedSize;
      } else {
        state.products.push({
          ...newProduct,
          quantity: 1,
          selectedColor: newProduct.selectedColor,
          selectedSize: newProduct.selectedSize
        });
      }
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const existingProduct = state.products.find(product => product.id === action.payload);
      if (existingProduct) {
        existingProduct.quantity = (existingProduct.quantity || 0) + 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const existingProduct = state.products.find(product => product.id === action.payload);
      if (existingProduct && existingProduct.quantity !== undefined) {
        if (existingProduct.quantity > 1) {
          existingProduct.quantity -= 1;
        } else {
          state.products = state.products.filter(product => product.id !== action.payload);
        }
      }
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(product => product.id !== action.payload);
    },
    clearBasket: (state) => {
      state.products = [];
    },
  },
});

export const { addProduct, removeProduct, increaseQuantity, decreaseQuantity, clearBasket } = productSlice.actions;

export default productSlice.reducer;
