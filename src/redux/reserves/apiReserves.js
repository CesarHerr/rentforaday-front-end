import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import itemAPI from '../../API/itemAPI';

let user = 'null';

const fetchReserves = createAsyncThunk('reserves/fetchReserves', async () => {
  if (localStorage.getItem('user') !== null) {
    user = JSON.parse(localStorage.getItem('user'));
  }
  const response = await axios.get(`${itemAPI.baseURL}${itemAPI.listReserves}${user.id}/appointments`);
  return response.data;
});

const deleteReserve = createAsyncThunk('reserves/deleteReserve', async (reserveId) => {
  if (localStorage.getItem('user') !== null) {
    user = JSON.parse(localStorage.getItem('user'));
  }
  const response = await axios.delete(`${itemAPI.baseURL}${itemAPI.listReserves}${user.id}/appointments/${reserveId}`);
  return response.data;
});

const postReserve = createAsyncThunk('reserves/postReserve', async (dataObject, { rejectWithValue }) => {
  try {
    if (localStorage.getItem('user') !== null) {
      user = JSON.parse(localStorage.getItem('user'));
    }
    const options = {
      method: 'POST',
      url: `${itemAPI.baseURL}${itemAPI.listReserves}${user.id}/appointments`,
      data: dataObject,
    };

    const response = await axios.request(options);
    return response.status;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export {
  fetchReserves, deleteReserve, postReserve,
};
