import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
};

const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    isOpen: (state, action) => {
      state.open = action.payload; // Set the open state in the Redux store
    },
  },
});

export const { isOpen } = drawerSlice.actions; // Export the action creator

export default drawerSlice.reducer;
