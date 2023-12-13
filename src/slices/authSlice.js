import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      authReducer: (state, action) => {
        console.log(action)
        state.token = action.payload;
      },
    }
})
export const { authReducer } = authSlice.actions;
export default authSlice.reducer;
