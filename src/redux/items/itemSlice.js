import { createSlice } from '@reduxjs/toolkit';
import { fetchItems, postItem, deleteItem } from './apiItem';

const initialState = {
  items: [],
  dataItem: [],
  error: undefined,
  isLoading: false,
  isDelete: false,
  isAdded: false,
  itemDetail: null,
  itemsByCity: [],
  formData: {
    name: '',
    city: '',
    description: '',
    price: '',
    image: '',
  },
};

const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setFormData(state, action) {
      state.formData = action.payload;
    },
    setDataItem(state, action) {
      state.dataItem = action.payload;
    },
    setIsDelete(state) {
      state.isDelete = false;
    },
    setIsAdded(state) {
      state.isAdded = false;
    },
    setItemDetail(state, action) {
      state.itemDetail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
        const uniqueCityObject = {};
        state.items.forEach((item) => {
          const { city } = item;
          if (!uniqueCityObject[city]) {
            uniqueCityObject[city] = item;
          }
        });
        state.itemsByCity = Object.values(uniqueCityObject);
        state.isLoading = false;
      })
      .addCase(fetchItems.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(postItem.fulfilled, (state) => {
        state.isAdded = true;
      })
      .addCase(postItem.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(postItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.isDelete = true;
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteItem.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default itemSlice.reducer;
export const {
  setFormData, setDataItem, setIsDelete, setIsAdded, setItemDetail,
} = itemSlice.actions;
