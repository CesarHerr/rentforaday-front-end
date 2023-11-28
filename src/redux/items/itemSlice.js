/* eslint-disable import/no-extraneous-dependencies */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import itemAPI from '../../API/itemAPI';

const initialState = {
  items: [],
  isLoading: false,
};

const fetchItems = createAsyncThunk(
  'item/fetchItems',
  async () => {
    try {
      const response = await axios.get(`${itemAPI.baseURL}${itemAPI.listItems}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch Items');
    }
  },
);

const postItem = createAsyncThunk('item/postItem', async (data, { rejectWithValue }) => {
  try {
    const options = {
      method: 'POST',
      url: `${itemAPI.baseURL}${itemAPI.listItems}`,
      data,
    };

    const response = await axios.request(options);

    if (response.status === 200) {
      return 'Item added successfully!';
    }
    return rejectWithValue('Failed to add item');
  } catch (error) {
    return rejectWithValue(`Error: ${error.message}`);
  }
});

const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(postItem.fulfilled, (state, action) => {
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(postItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postItem.rejected, (state, action) => {
        state.message = action.error.message;
        state.isLoading = false;
      });
  },
});

export default itemSlice.reducer;

export { fetchItems, postItem };
