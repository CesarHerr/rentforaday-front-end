import { toast } from 'react-hot-toast';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import itemAPI from '../../API/itemAPI';
import { setToken } from './tokenSlice';

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
        toast.success(`Successful login. Welcome, ${user.name}`);
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
