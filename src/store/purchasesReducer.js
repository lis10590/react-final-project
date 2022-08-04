import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getPurchases,
  addPurchase,
  updatePurchase,
  deletePurchase,
} from "../api/purchases";

const initialPurchasesState = {
  purchases: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const purchaseAddition = createAsyncThunk(
  "purchases/addpurchase",
  async (purchase, thunkAPI) => {
    try {
      return await addPurchase(purchase);
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

export const getAllPurchases = createAsyncThunk(
  "purchases/getallpurchases",
  async (thunkAPI) => {
    try {
      return await getPurchases();
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

export const updateOnePurchase = createAsyncThunk(
  "purchases/updatepurchase",
  async (purchaseId, thunkAPI) => {
    try {
      return await updatePurchase(purchaseId);
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

export const deleteOnePurchase = createAsyncThunk(
  "purchases/deletepurchase",
  async (purchaseId, thunkAPI) => {
    try {
      return await deletePurchase(purchaseId);
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

const purchasesSlice = createSlice({
  name: "purchases",
  initialState: initialPurchasesState,
  extraReducers: (builder) => {
    builder
      .addCase(purchaseAddition.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(purchaseAddition.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.purchases.push(action.payload);
      })
      .addCase(purchaseAddition.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllPurchases.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllPurchases.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.purchases = action.payload;
      })
      .addCase(getAllPurchases.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteOnePurchase.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteOnePurchase.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.purchases = state.purchases.filter(
          (purchase) => purchase.id !== action.payload.id
        );
      })
      .addCase(deleteOnePurchase.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default purchasesSlice.reducer;
export const selectAllPurchases = (state) => state.purchases.purchases;
