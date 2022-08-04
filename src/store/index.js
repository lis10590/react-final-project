import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalReducer";
import productsReducer from "./productsReducer";
import customersReducer from "./customersReducer";
import purchasesReducer from "./purchasesReducer";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    products: productsReducer,
    customers: customersReducer,
    purchases: purchasesReducer,
  },
});

export default store;
