import { createSlice } from '@reduxjs/toolkit';

interface HomeState {

}
const initialState: HomeState = {

}
export const homeSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {

  },

});


export const homeReducer = homeSlice.reducer;
