import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null
};

const userSlice = createSlice({
  name: 'userdata',
  initialState,
  reducers: {
    setUserEmail: (state, action) => {
      state.email = action.payload; // Set the email in the Redux state
    },
  },
});

export const { setUserEmail } = userSlice.actions; // Export the action creator

export default userSlice.reducer;
