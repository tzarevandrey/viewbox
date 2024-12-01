import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Role } from "../core/enums/roles.enum";
import { TAuthResponseDto } from "../core/types/auth.response.dto";

type TState = {
  token: string;
  roles: Role[];
  expired: number | null;
}

const initialState: TState = {
  token: '',
  roles: [],
  expired: Date.now()
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
    },
    setExpired: (state, action: PayloadAction<number | null>) => {
      state.expired = action.payload;
    },
    setAuth: (state, action: PayloadAction<TAuthResponseDto>) => {
      state.expired = action.payload.expired;
      state.token = action.payload.token;
      state.roles = [...action.payload.roles];
    }
  }
})

export const {
  setToken,
  setRoles,
  setExpired,
  setAuth,
} = userSlice.actions;

export const userReducer = userSlice.reducer;