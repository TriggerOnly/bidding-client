import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios';

export const fetchBiddings = createAsyncThunk('biddings/fetchBiddings', async () => {
  const { data } = await axios.get('/biddings');
  return data;
});

export const fetchBidding = createAsyncThunk('biddings/fetchBidding', async (_id) => {
  const { data } = await axios.get(`/biddings/${_id}`);
  return data;
});

export const removeBidding = createAsyncThunk('biddings/removeBidding', async (_id) => {
    await axios.delete(`/biddings/${_id}`);
});


const biddingSlice = createSlice({
  name: 'biddings',
  initialState: {
    items: [],
    bidding: null,
    status: 'loading',
  },
  reducers: {
    clearBiddings: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchBiddings.pending, (state) => {
            state.items = [];
            state.status = 'loading';
        })
        .addCase(fetchBiddings.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = 'loaded';
        })
        .addCase(fetchBiddings.rejected, (state) => {
            state.items = [];
            state.status = 'error';
        })
        .addCase(fetchBidding.pending, (state) => {
          state.bidding = [];
          state.status = 'loading';
        })
        .addCase(fetchBidding.fulfilled, (state, action) => {
            state.bidding = action.payload;
            state.status = 'loaded';
        })
        .addCase(fetchBidding.rejected, (state) => {
            state.bidding = [];
            state.status = 'error';
        })
        .addCase(removeBidding.pending, (state, action) => {
            state.items = state.items.filter((obj) => obj._id !== action.meta.arg);
        });
  },
});


export const biddingReducer = biddingSlice.reducer
