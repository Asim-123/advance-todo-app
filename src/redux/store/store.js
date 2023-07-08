import { configureStore } from '@reduxjs/toolkit';
import userReducer from "../slices/userslice";
import drawerReducer from '../slices/drawerslice';
import dataReducer from '../slices/dataslice'
import subTasksReducer from '../slices/subtasksslice'
const store = configureStore({
  reducer: {
    user: userReducer,
    drawer: drawerReducer,
    data: dataReducer,
    subtasks: subTasksReducer
  }
});

export default store;
