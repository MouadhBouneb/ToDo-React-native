import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../slices/taskSlice';
import authReducer  from '../slices/authSlice';

const store = configureStore({
  reducer: {
    task: taskReducer,
    auth: authReducer,
  },
});

export default store;
