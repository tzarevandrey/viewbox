import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TPlaylistItem } from "../core/types/playlist-item"

type TState = {
  currentList: TPlaylistItem[];
  nextList: TPlaylistItem[];
  flag: boolean;
  currentIndex: number;
}

const initialState: TState = {
  currentList: [],
  nextList: [],
  flag: false,
  currentIndex: 1,
}

export const playSlice = createSlice({
  name: 'play',
  initialState,
  reducers: {
    setItems: (state, actions: PayloadAction<TPlaylistItem[]>) => {
      if (state.flag) {
        state.currentList = [...actions.payload];
        if (state.nextList.length === 0) state.nextList = [...actions.payload];
      } else {
        state.nextList = [...actions.payload];
        if (state.currentList.length === 0) state.currentList = [...actions.payload];
      }
    },
    goNext: (state) => {
      if (state.flag) {
        if (state.currentIndex >= state.nextList.length) {
          state.currentIndex = 1;
          state.flag = !state.flag;
        } else {
          state.currentIndex = state.currentIndex + 1;
        }
      } else {
        if (state.currentIndex >= state.currentList.length) {
          state.currentIndex = 1;
          state.flag = !state.flag;
        } else {
          state.currentIndex = state.currentIndex + 1;
        }
      }
    }
  }
})

export const {
  setItems,
  goNext,
} = playSlice.actions;

export const playReducer = playSlice.reducer;