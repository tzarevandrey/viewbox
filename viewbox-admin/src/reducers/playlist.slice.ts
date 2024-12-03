import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ContentType } from '../core/enums/content.enum';
import { TPlaylistItem } from '../core/types/playlist-item';
import { NUMBERS } from '../core/constants/numbers';
import { TContent } from '../core/types/content';

type TState = {
  items: TPlaylistItem[];
}

const initialState: TState = {
  items: [],
}

export const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: ({
    updateItem: (state, action: PayloadAction<TPlaylistItem>) => {
      state.items = state.items.map(x => x.position === action.payload.position ? action.payload : x);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(x => x.position !== action.payload)
        .map(x => x.position > action.payload ? { ...x, position: x.position - 1 } : x);
    },
    addItem: (state, action: PayloadAction<TContent>) => {
      const position = state.items.length + 1;
      state.items = [...state.items, {
        contentItem: action.payload,
        position,
        duration: action.payload.contentType === ContentType.Video ? null : NUMBERS.DEFAULT_DURATION,
        startDate: null,
        expireDate: null,
      }]
    },
    upItem: (state, action: PayloadAction<number>) => {
      const prevItems = state.items.filter(x => x.position < action.payload);
      if (prevItems.length > 0) {
        const temp = state.items.map(x => {
          if (x.position === action.payload - 1) return { ...x, position: action.payload };
          if (x.position === action.payload) return { ...x, position: action.payload - 1 };
          return x;
        })
        state.items = [...temp];
      }
    },
    downItem: (state, action: PayloadAction<number>) => {
      const nextItems = state.items.filter(x => x.position > action.payload);
      if (nextItems.length > 0) {
        const temp = state.items.map(x => {
          if (x.position === action.payload + 1) return { ...x, position: action.payload };
          if (x.position === action.payload) return { ...x, position: action.payload + 1 };
          return x;
        })
        state.items = [...temp];
      }
    },
    fillItems: (state, action: PayloadAction<TPlaylistItem[]>) => {
      state.items = [...action.payload]
    },
    clearItems: (state) => {
      state.items = initialState.items;
    }
  })
})

export const {
  addItem,
  removeItem,
  upItem,
  downItem,
  updateItem,
  fillItems,
  clearItems
} = playlistSlice.actions;

export const playlistReducer = playlistSlice.reducer;
