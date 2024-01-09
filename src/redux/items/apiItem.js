import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import itemAPI from '../../API/itemAPI';

const fetchItems = createAsyncThunk('fetch/fetchItems', async () => {
  const response = await axios.get(itemAPI.baseURL + itemAPI.listItems);
  return response.data;
});

const postItem = createAsyncThunk('post/postItem', async (item) => {
  const response = await axios.post(itemAPI.baseURL + itemAPI.listItems, item);
  return response.data;
});

const deleteItem = createAsyncThunk('delete/deleteItem', async (id) => {
  const response = await axios.delete(`${itemAPI.baseURL + itemAPI.deleteItems}/${id}`);
  return response.data;
});

export { fetchItems, postItem, deleteItem };
