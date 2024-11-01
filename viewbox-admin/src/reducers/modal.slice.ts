import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FC } from "react";

type TState = {
  isOpened: boolean;
  Element: FC | null;
}

const initialState: TState = {
  isOpened: false,
  Element: null,
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: ({
    openModal: (state, action: PayloadAction<FC>) => {
      state.Element = action.payload;
      state.isOpened = true;
    },
    closeModal: (state) => {
      state.isOpened = false;
    }
  })
})

export const {
  openModal,
  closeModal,
} = modalSlice.actions;

export const modalReducer = modalSlice.reducer;