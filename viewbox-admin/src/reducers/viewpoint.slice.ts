import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TViewpointItem } from '../core/types/viewpoint-item';
import { TPlaylist } from '../core/types/playlist';

type TState = {
  items: TViewpointItem[];
}

const initialState: TState = {
  items: [],
}

export const viewpointSlice = createSlice({
  name: 'viewpoint',
  initialState,
  reducers: ({
    updateViewpointItem: (state, action: PayloadAction<TViewpointItem>) => {
      state.items = state.items.map(x => x.id === action.payload.id ? action.payload : x);
    },
    removeViewpointItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(x => x.id !== action.payload);
    },
    addViewpointItem: (state, action: PayloadAction<TPlaylist>) => {
      state.items = [...state.items, {
        id: Math.min(Math.min(...state.items.map(x => x.id ?? 0)), 0) - 1,
        playlist: action.payload,
        isDefault: false,
        startDate: new Date(),
        expireDate: null,
      }]
    },
    fillViewpointItems: (state, action: PayloadAction<TViewpointItem[]>) => {
      state.items = [...action.payload]
    },
    clearViewpointItems: (state) => {
      state.items = initialState.items;
    },
    setDefaultPlaylist: (state, action: PayloadAction<number>) => {
      state.items = state.items.map(x => {
        if (x.id === action.payload) {
          return { ...x, startDate: null, expireDate: null, isDefault: true };
        } else {
          if (x.isDefault) {
            return { ...x, startDate: new Date(), isDefault: false };
          } else return { ...x };
        }
      })
    },
  })
})

export const {
  addViewpointItem,
  removeViewpointItem,
  updateViewpointItem,
  fillViewpointItems,
  clearViewpointItems,
  setDefaultPlaylist,
} = viewpointSlice.actions;

export const viewpointReducer = viewpointSlice.reducer;
