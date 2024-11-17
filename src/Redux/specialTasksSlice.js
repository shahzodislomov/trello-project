import { createSlice } from "@reduxjs/toolkit";

const specialTasksSlice = createSlice({
  name: "specialTasks",
  initialState: [],
  reducers: {
    addSpecialTask: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addSpecialTask } = specialTasksSlice.actions;
export default specialTasksSlice.reducer;

