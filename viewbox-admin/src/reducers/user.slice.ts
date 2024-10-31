import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Role } from "../enums/roles.enum";

type TState = {
    token: string;
    roles: Role[];
}

const initialState: TState = {
    token: '',
    roles: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        setRoles: (state, action: PayloadAction<Role[]>) => {
            state.roles = [...action.payload];
        }
    }
})

export const {
    setToken,
} = userSlice.actions;

export const userReducer = userSlice.reducer;