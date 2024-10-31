import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TState = {
  title: string;
}

const initialState: TState = {
  title: ''
}

export const titleSlice = createSlice({
  name: 'title',
  initialState,
  reducers: ({
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    }
  })
})

export const {
  setTitle
} = titleSlice.actions;

export const titleReducer = titleSlice.reducer;