// eslint-disable-next-line
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  userData : {}
};

const userSlice = createSlice({
  name : "user",
  initialState,
  reducers : {
  },
  extraReducers : builder => {
  }
});

// export const { } = userSlice.actions;
export default userSlice.reducer;