import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isNavbarOpen : false,
  error : "‎",
  authRoute : "login",
};

const utilSlice = createSlice({
  name : "utils",
  initialState,
  reducers : {
    setUtil : (state, action) => {
      state[Object.keys(action.payload)[0]] = action.payload[Object.keys(action.payload)[0]];
    },
  },
  extraReducers : builder => {
    builder.addCase(setAppError.pending, (state, {meta}) => {        
      state.error = meta.arg;
    })
    builder.addCase(setAppError.fulfilled, (state, action) => {
      state.error = "‎";
    })

    builder.addCase(toggleNavbar.pending, (state, { meta }) => {
      state.isNavbarOpen = meta.arg;
      document.querySelector(".logo").style.display = meta.arg?"none":"flex";
      document.querySelector(".nav-links").style.display = meta.arg?"flex":"none";
    });
    builder.addCase(toggleNavbar.fulfilled, (state, action) => {
      if (state.isNavbarOpen) {
        state.isNavbarOpen = !state.isNavbarOpen;
        document.querySelector(".logo").style.display = "flex";
        document.querySelector(".nav-links").style.display = "none";
      }       
    })
  }
});

export const setAppError = createAsyncThunk('utils/setAppError', async (error, store) => {
  await new Promise(resolve => setTimeout(resolve, 5000));
})

export const toggleNavbar = createAsyncThunk('utils/toggleNavbar', async (navState, store) => {
  await new Promise(resolve => setTimeout(resolve, 5000));
})

export const { setUtil } = utilSlice.actions;
export default utilSlice.reducer;