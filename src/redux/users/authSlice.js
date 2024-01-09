import { createSlice } from '@reduxjs/toolkit';
import { loginUser, logoutUser, registerUser } from './authApi';

const initialState = {
  id: null,
  user: null,
  isAuthenticated: false,
  isRegistered: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearRegistration: (state) => {
      state.isRegistered = false;
    },
    setLocalStorage: (state, action) => {
      state.id = JSON.parse(action.payload).id;
      state.user = JSON.parse(action.payload).name;
    },
  },
  extraReducers(builder) {
    // registerUser
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.isRegistered = true;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // loginUser
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.id = action.payload.data.id;
      state.isLoading = false;
      state.error = null;
      state.user = action.payload.data.name;
      state.isAuthenticated = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // logoutUser
    builder.addCase(logoutUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.id = null;
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { clearRegistration, setLocalStorage } = authSlice.actions;

export default authSlice.reducer;
