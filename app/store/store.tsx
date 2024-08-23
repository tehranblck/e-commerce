"use client";
import { combineReducers, configureStore  } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice"
import productReducer from "./features/product/productSlice"

const rootReducer = combineReducers({
  counter: counterReducer,
  product:productReducer
  
},);

export const store = configureStore({
  reducer: rootReducer,
 });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;