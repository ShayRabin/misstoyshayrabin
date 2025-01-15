import { configureStore } from "@reduxjs/toolkit";
import toysReducer from "./toys/toysSlice";

export const store = configureStore({
  reducer: {
    toys: toysReducer,
  },
});

export default store;
