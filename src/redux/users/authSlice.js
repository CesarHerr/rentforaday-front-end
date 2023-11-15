import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import { setToken } from './tokenSlice';

import itemAPI from '../../API/itemAPI';

const initialState = {
  id: null,
  user: null,
  isAuthenticated: false,
  isRegistered: false,
  isLoading: false,
  error: null,
  userStorage: null,
  idStorage: null,
};

// Async thunk for user login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${itemAPI.baseURL}${itemAPI.login}`,
        { user: formData },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.data.status.code === 200 && response.data.status.message === 'Logged in sucessfully.') {
        // destructure the response data to get the token and user
        const token = response.headers.authorization;
        const user = response.data.data;
        toast.success(`Successful login. Welcome, ${user.name}`, {
          icon: '👏',
          duration: 5000,
        });
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        thunkAPI.dispatch(setToken(token));
      }
      if (response.data.status.success === false) {
        toast.error(`Registration failed. ${response.data.message[0]}`);
      }

      // Return the user data
      return response.data;
    } catch (error) {
      // Return the error message
      toast.error(`Login failed. ${error.message}`);
      return thunkAPI.rejectWithValue(error.message);
    }
  },

);

// Async Thunk for user registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${itemAPI.baseURL}${itemAPI.registration}`,
        { user: formData },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.data.success === true) {
        toast.success('Registration successful. Please login.');
      }
      if (response.data.success === false) {
        toast.error(`Registration failed. ${response.data.message[0]}`);
      }
      return response.data;
    } catch (error) {
      toast.error(`Registration failed. ${error.message}`);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// Async Thunk for user logout
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${itemAPI.baseURL}${itemAPI.logout}`,
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        },
      );
      if (response.data.status.success === 200 || response.data.message === 'logged out successfully' || response.data.message === "Couldn't find an active session.") {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        thunkAPI.dispatch(setToken(null));
        toast.success('Logout successful.');
      }
      if (response.data.status.success === 200) {
        toast.error(`Logout failed. ${response.data.message[0]}`);
      }
      return response.data;
    } catch (error) {
      toast.error(`Logout failed. ${error.message}`);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearRegistration: (state) => {
      state.isRegistered = false;
    },
    setLocalStorage: (state, action) => {
      state.userStorage = JSON.parse(action.payload).name;
      state.idStorage = JSON.parse(action.payload).id;
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
      state.userStorage = null;
      state.idStorage = null;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { clearRegistration, setLocalStorage } = authSlice.actions;

export default authSlice.reducer;
