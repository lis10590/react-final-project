import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from "../api/customers";

const initialCustomersState = {
  customers: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const customerAddition = createAsyncThunk(
  "customers/addcustomer",
  async (customer, thunkAPI) => {
    try {
      return await addCustomer(customer);
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

export const getAllCustomers = createAsyncThunk(
  "customers/getallcustomers",
  async (thunkAPI) => {
    try {
      return await getCustomers();
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

export const updateOneCustomer = createAsyncThunk(
  "customers/updatecustomer",
  async (customerId, thunkAPI) => {
    try {
      return await updateCustomer(customerId);
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

export const deleteOneCustomer = createAsyncThunk(
  "customers/deletecustomer",
  async (customerId, thunkAPI) => {
    try {
      return await deleteCustomer(customerId);
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

const customersSlice = createSlice({
  name: "customers",
  initialState: initialCustomersState,
  extraReducers: (builder) => {
    builder
      .addCase(customerAddition.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(customerAddition.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.customers.push(action.payload);
      })
      .addCase(customerAddition.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllCustomers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.customers = action.payload;
      })
      .addCase(getAllCustomers.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteOneCustomer.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteOneCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.customers = state.customers.filter(
          (product) => product.id !== action.payload.id
        );
      })
      .addCase(deleteOneCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default customersSlice.reducer;
export const selectAllCustomers = (state) => state.customers.customers;
