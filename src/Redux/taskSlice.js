import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    todayTasks: [],
    weeklyTasks: [],
    monthlyTasks: [],
  },
  reducers: {
    addTask: (state, action) => {
      const { section, task } = action.payload;
      if (section && state[section]) {
        state[section].push(task);
      }
    },
    changeStatus: (state, action) => {
      const { section, id, status } = action.payload;
      const taskList = state[section];
      if (taskList) {
        const task = taskList.find((task) => task.id === id);
        if (task) {
          task.status = status;
        }
      }
    },
    deleteTask: (state, action) => {
      const { section, id } = action.payload;
      const taskList = state[section];
      if (taskList) {
        
        state[section] = taskList.filter((task) => task.id !== id);
      }
    },
  },
});

export const { addTask, deleteTask, changeStatus } =
  taskSlice.actions;
export default taskSlice.reducer;