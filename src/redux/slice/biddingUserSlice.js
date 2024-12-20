  import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
  import axios from "../../axios";

  export const connectionOrCreateParticipant = createAsyncThunk(
      'bidding/fetchAuthParticipant',
      async ({ params, _id }) => {
        const { data } = await axios.post(`/connectionByParticipant/${_id}`, params);
        return data;
      }
  );

  export const allParticipants = createAsyncThunk(
    'biddingUser/fetchAllParticipants',
    async ({ _id }) => {
      const { data } = await axios.get(`/biddings/participants/${_id}`);
      return { _id, users: data.users || [] };
    }
  );

  export const selectParticipantsArray = createSelector(
    (state) => state.biddingUser.users,
    (users) => {
      const participants = Object.values(users)[0]; 
      return Array.isArray(participants) ? participants : [];
    }
  );

  const initialState = {
    users: {},
    participants: {},
    status: 'loading',
  };

  const biddingUserSlice = createSlice({
    name: "biddingUser",  
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(allParticipants.pending, (state) => {
          state.usersStatus = 'loading';
        })
        .addCase(allParticipants.fulfilled, (state, action) => {
          const { _id, users } = action.payload;
          state.users[_id] = users; 
          state.status = 'loaded';
        })
        .addCase(allParticipants.rejected, (state) => {
          state.users = [];
          state.usersStatus = 'error';
        })
    }
  });

  export default biddingUserSlice.reducer;
  export const biddingUserReducer = biddingUserSlice.reducer
