import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/api";
import { userReducer } from "./reducers/user.slice";
import { api0 } from "./api/auth-api";

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        [api0.reducerPath]: api0.reducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware).concat(api0.middleware)
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;