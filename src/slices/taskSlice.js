import { createSlice } from '@reduxjs/toolkit';

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
      const { id, title, completed } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex].title = title;
        state.tasks[taskIndex].completed = completed;
      }
    },
  },
});

export const { setTasks, updateTaskStatus, updateTask } = taskSlice.actions;
export const selectTasks = (state) => state.task.tasks;

export default taskSlice.reducer;
