import { createSlice, configureStore } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: { user: "", isLoggin: false },
  reducers: {
    login(state) {
      state.isLoggin = true;
    },
    logout(state) {
      state.isLoggin = false;
    },
  },
});

export const authActions = authSlice.actions;
export const store = configureStore({
  reducer: authSlice.reducer,
});
