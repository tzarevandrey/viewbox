import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TPlaylistItem } from "../core/types/playlist-item"

type TState = {
  currentList: TPlaylistItem[];
  nextList: TPlaylistItem[];
}

const initialState: TState = {
  currentList: [],
  nextList: []
}

export const playSlice = createSlice({
  name: 'play',
  initialState,
  reducers: {
    setNext: (state, actions: PayloadAction<TPlaylistItem[]>) => {
      if (state.nextList.length === 0) {
        state.currentList = [...actions.payload];
      } else {
        state.currentList = [...state.nextList];
      } 
      state.nextList = [...actions.payload];
    }
  }
})