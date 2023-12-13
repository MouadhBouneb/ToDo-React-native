import { createSlice } from '@reduxjs/toolkit';
import { updateTaskApi } from '../services/taskService';

const initialState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    updateTaskStatus: (state, action) => {
      const { id, status } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex].status = status;
      }
    },
    updateTask: (state, action) => {
      const { id, title, status } = action.payload;
      updateTaskApi({title, state:status},id)
    },
  },
});

export const { setTasks, updateTaskStatus, updateTask } = taskSlice.actions;
export const selectTasks = (state) => state.task.tasks;

export default taskSlice.reducer;
