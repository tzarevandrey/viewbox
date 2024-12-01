import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/api";
import { api0 } from "./api/auth-api";
import { userReducer } from "./reducers/user.slice";
import { playReducer } from "./reducers/play.slice";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [api0.reducerPath]: api0.reducer,
    user: userReducer,
    play: playReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(api0.middleware).concat(api.middleware)
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;