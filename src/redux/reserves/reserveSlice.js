import { createSlice } from '@reduxjs/toolkit';
import {
  fetchReserves, deleteReserve, postReserve,
} from './apiReserves';

const initialState = {
  selectedItem: '',
  selectedCity: '',
  selectedDate: '',
  isReserved: false,
  reserves: [],
  isLoading: false,
  isDeleting: false,
  error: undefined,
  status: undefined,
  itemId: null,
};

const reserveSlice = createSlice({
  name: 'reserves',
  initialState,
  reducers: {
    setSelectedItem(state, action) {
      state.selectedItem = action.payload;
    },
    setSelectedCity(state, action) {
      state.selectedCity = action.payload;
    },
    setSelectedDate(state, action) {
      state.selectedDate = action.payload;
    },
    setIsReserved(state) {
      state.isReserved = false;
    },
    setStatus(state) {
      state.status = undefined;
    },
    setIsDeleting(state) {
      state.isDeleting = false;
    },
    setItemId(state, action) {
      state.itemId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReserves.fulfilled, (state, action) => {
        state.reserves = action.payload;
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(fetchReserves.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchReserves.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteReserve.fulfilled, (state, action) => {
        state.isDeleting = true;
        state.reserves = state.reserves.filter((reserve) => reserve.id !== action.payload);
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(deleteReserve.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(deleteReserve.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(postReserve.fulfilled, (state) => {
        state.isLoading = false;
        state.isReserved = true;
        state.error = undefined;
      })
      .addCase(postReserve.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(postReserve.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.status = action.payload.error;
      });
  },
});

export const {
  setSelectedItem, setSelectedCity, setSelectedDate,
  setIsReserved, setStatus, setIsDeleting, setItemId,
} = reserveSlice.actions;
export default reserveSlice.reducer;
