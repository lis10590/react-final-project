import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../api/products";

const initialProductsState = {
  products: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const productAddition = createAsyncThunk(
  "products/addproduct",
  async (product, thunkAPI) => {
    try {
      return await addProduct(product);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllProducts = createAsyncThunk(
  "products/getallproducts",
  async (thunkAPI) => {
    try {
      return await getProducts();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateOneProduct = createAsyncThunk(
  "products/updateproduct",
  async (productId, thunkAPI) => {
    try {
      return await updateProduct(productId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteOneProduct = createAsyncThunk(
  "products/deleteproduct",
  async (productId, thunkAPI) => {
    try {
      return await deleteProduct(productId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: initialProductsState,
  extraReducers: (builder) => {
    builder
      .addCase(productAddition.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(productAddition.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products.push(action.payload);
      })
      .addCase(productAddition.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteOneProduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteOneProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = state.products.filter(
          (product) => product.id !== action.payload.id
        );
      })
      .addCase(deleteOneProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default productsSlice.reducer;
export const selectAllProducts = (state) => state.products.products;
