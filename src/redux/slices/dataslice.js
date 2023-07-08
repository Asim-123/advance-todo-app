import { createSlice } from '@reduxjs/toolkit';

const initialState = {}

const getDataSlice = createSlice({
  name: 'getdata',
  initialState,
  reducers: {
    getData: (state, action) => {
      state.open = action.payload; // Set the open state in the Redux store
    },
  },
});

export const { getData } = getDataSlice.actions; // Export the action creator

export default getDataSlice.reducer;
