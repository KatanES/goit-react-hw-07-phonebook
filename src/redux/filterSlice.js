import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setContactFilter(state, action) {
      return action.payload;
    },
  },
});

export const { setContactFilter } = filterSlice.actions;

export const filterReducer = filterSlice.reducer;
