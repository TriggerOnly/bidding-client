import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";
import { allParticipants } from "./biddingUserSlice";

export const fetchBiddingInfo = createAsyncThunk('biddings/fetchBiddingInfo', async (biddingId) => {
  const { data } = await axios.post(`/createBiddingCriteria/${biddingId}`);
  return data;  
});

export const allBiddingInfo = createAsyncThunk('biddings/fetchAllBiddingInfo', async (biddingId) => {
  const { data } = await axios.get(`/allBiddingCriteria/${biddingId}`);
  return { biddingId, data: Array.isArray(data) ? data : [] };
});

export const addParticipantAnswer = createAsyncThunk(
  'biddingInfo/addParticipantAnswer',
  async ({ id }) => {
    const { data } = await axios.post(`/createBiddingCriteriaParticipant/${id}`);
    return data;
  }
)

export const allParticipantAnswers = createAsyncThunk('biddingInfo/allParticipantAnswers', async (biddingId) => {
    try {      
      const {data} = await axios.get(`/biddings/participants/${biddingId}`);
      return data;
    } catch (error) {
      console.log(error)
    }
  })

  const initialState = {
    items: {
      criteria: {},
      organizations: [],
      text: '', 
    },
    participantAnswers: [],
    status: 'loading',
  };
  
  const biddingInfoSlice = createSlice({
    name: 'biddingInfo',
    initialState,
    reducers: {
      clearBiddings: (state) => {
        state.items = [];
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchBiddingInfo.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchBiddingInfo.fulfilled, (state, action) => {
          state.items = action.payload || { criteria: [], organizations: [] }; 
          state.status = 'loaded';
        })
        .addCase(fetchBiddingInfo.rejected, (state) => {
          state.status = 'error';
        })
        .addCase(allBiddingInfo.fulfilled, (state, action) => {
          const { biddingId, data } = action.payload;
          if (!state.items.criteria) {
            state.items.criteria = {}; 
          }
          state.items.criteria[biddingId] = data; 
          state.status = 'loaded';
        })        
        .addCase(allBiddingInfo.rejected, (state, action) => {
          state.items.criteria = [];
          state.status = 'error';
          console.error(action.error?.message || "Ошибка загрузки данных");
        })
        .addCase(allParticipants.fulfilled, (state, action) => {
          state.participants = action.payload || []; 
          state.status = 'loaded';
        })
        .addCase(allParticipants.rejected, (state) => {
          state.participants = [];
          state.status = 'error';
        })
        .addCase(allParticipantAnswers.fulfilled, (state, action) => {
          state.participantAnswers = action.payload || [];
          state.status = 'loaded';
        })
        .addCase(allParticipantAnswers.rejected, (state) => {
          state.participantAnswers = [];
          state.status = 'error';
        });
    },
  });
  

export const { clearBiddings } = biddingInfoSlice.actions;
export const biddingInfoReducer = biddingInfoSlice.reducer;
