import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TCreatePlaylistItemDto } from '../components/pages/playlists/dto/create.playlists.dto';
import { ContentType } from '../core/enums/content.enum';
import { TPlaylistItem } from '../core/types/playlist-item';
import { TGetContentDto } from '../components/pages/contents/dto/get.content.dto';
import { NUMBERS } from '../core/constants/numbers';

type TState = {
  items: TCreatePlaylistItemDto[];
}

const initialState: TState = {
  items: [],
}

export const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: ({
    updateItem: (state, action: PayloadAction<TCreatePlaylistItemDto>) => {
      state.items = state.items.map(x => x.position === action.payload.position ? action.payload : x);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(x => x.position !== action.payload)
        .map(x => x.position > action.payload ? { ...x, position: action.payload - 1 } : x);
    },
    addItem: (state, action: PayloadAction<TGetContentDto>) => {
      const position = state.items.length + 1;
      let contentName = action.payload.name;
      switch (action.payload.contentType) {
        case ContentType.Picture: contentName = action.payload.imageItem?.originalName ?? contentName;
          break;
        case ContentType.Video: contentName = action.payload.videoItem?.originalName ?? contentName;
          break;
      }
      state.items = [...state.items, {
        contentItemId: action.payload.id,
        position,
        duration: action.payload.contentType === ContentType.Video ? null : NUMBERS.DEFAULT_DURATION,
        contentName,
        startDate: null,
        expireDate: null,
        contentType: action.payload.contentType
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
      state.items = action.payload.map(x => {
        let contentName = x.contentItem.name;
        switch (x.contentItem.contentType) {
          case ContentType.Picture: contentName = x.contentItem.imageItem?.originalName ?? contentName;
            break;
          case ContentType.Video: contentName = x.contentItem.videoItem?.originalName ?? contentName;
            break;
        }
        return {
          contentItemId: x.contentItem.id,
          contentName,
          position: x.position,
          duration: x.duration,
          startDate: x.startDate,
          expireDate: x.expireDate,
          contentType: x.contentItem.contentType
        }
      })
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
