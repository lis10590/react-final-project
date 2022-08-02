import { createSlice } from "@reduxjs/toolkit";

const initialModalState = { modalState: false };
const modalSlice = createSlice({
  name: "modal",
  initialState: initialModalState,
  reducers: {
    ModalOpen(state) {
      state.modalState = true;
    },
    ModalClose(state) {
      state.modalState = false;
    },
  },
});

export default modalSlice.reducer;
export const modalActions = modalSlice.actions;
