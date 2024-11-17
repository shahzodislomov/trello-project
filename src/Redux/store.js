import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import taskReducer from "./taskSlice";
import specialTasksReducer from "./specialTasksSlice"; 
import { loadState, saveState } from "./storage";

const persistedState = loadState();

const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: taskReducer,
    specialTasks: specialTasksReducer, 
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
