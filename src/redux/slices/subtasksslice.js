import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  values: []
};

const subtasksSlice = createSlice({
  name: "subtasks",
  initialState,
  reducers: {
    getSubtasks: (state, action) => {
      state.values = action.payload;
    },
  },
});

export const { getSubtasks } = subtasksSlice.actions;

export default subtasksSlice.reducer;
