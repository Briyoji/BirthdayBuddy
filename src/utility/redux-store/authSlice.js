import { createSlice } from "@reduxjs/toolkit";

const HOST_URI = process.env.APP_HOST_URI;

const initialState = {
  authData : {}
};

const authSlice = createSlice({
  name : "auth",
  initialState,
  reducers : {
    // CRUD Actions: 
    
    // Create: /auth/signup
    signup : async (state, action) => {
      // const response = await fetch(`${HOST_URI}/auth/signup`, {
      //   method : "POST",
      //   headers : {
      //     "Content-Type" : "application/json"
      //   },
      //   body : JSON.stringify(action.payload)
      // });
      // const data = await response.json();
      // state.authData = data;
      console.log("signup", action.payload);
    }
  }
});

export const {  } = authSlice.actions;
export default authSlice.reducer;