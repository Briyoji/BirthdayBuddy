import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNavbarOpen : false,
};

const utilSlice = createSlice({
  name : "utils",
  initialState,
  reducers : {
    setUtil : (state, action) => {
      state[Object.keys(action.payload)[0]] = action.payload[Object.keys(action.payload)[0]];
    }
  }
});

export const { setUtil } = utilSlice.actions;
export default utilSlice.reducer;