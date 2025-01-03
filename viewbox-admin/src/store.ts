import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/api";
import { userReducer } from "./reducers/user.slice";
import { api0 } from "./api/auth-api";
import { titleReducer } from "./reducers/title.slice";
import { modalReducer } from "./reducers/modal.slice";
import { playlistReducer } from './reducers/playlist.slice';
import { viewpointReducer } from './reducers/viewpoint.slice';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [api0.reducerPath]: api0.reducer,
    user: userReducer,
    title: titleReducer,
    modal: modalReducer,
    playlist: playlistReducer,
    viewpoint: viewpointReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(api0.middleware).concat(api.middleware)
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;