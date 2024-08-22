// slice : 1)splitting up redux state objects into multiple slices of state
// 2) a collection of reducer logic and actions for a single feature in the app
// ex blog have slice for post, another slice for comments

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// create initial state
const initialState = {
  count: 0,
};

// synchrous action
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // actions : to tell redux what it should do the state
  //   name all of out different actions for counter: increment and decrement and reset and incrementByAmount
  // reducers : tacking an action and depending on the type of action will make the update in the redux store
  // reducers will never directly make an update to the redux store
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    reset: (state) => {
      state.count = 0;
    },
    incrementByAmount: (state, action) => {
      // action.payload : amount that we pass in(in our case it is addValue from the Counter component)
      // payload is optional, any data that you want to send th redux in your action
      state.count += action.payload;
    },
  },
  // async : reducer second
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, () => {
        console.log('incrementAsync.pending');
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.count += action.payload;
      });
  },
});

// async: action first
export const incrementAsync = createAsyncThunk(
  'counter/incrementAsync', // name of action
  // async function
  async (amount) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return amount; // payload of this action
  }
);

// export reducer and actions

// destructure actions from counterSlice.actions
export const { increment, decrement, reset, incrementByAmount } =
  counterSlice.actions;

export default counterSlice.reducer;
