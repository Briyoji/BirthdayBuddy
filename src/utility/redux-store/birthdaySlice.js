import { createSlice } from "@reduxjs/toolkit";

// eslint-disable-next-line
const HOST_URI = process.env.APP_HOST_URI;

const initialState = {
  birthdays : {}
};

const birthdaySlice = createSlice({
  name : "birthday",
  initialState,
  reducers : {
    setBirthday : (state, action) => {
      console.log(action.payload, state)
    },

    getBirthdays : async (state, action) => {
      console.log("getBirthdays", state, action)
      // const response = await fetch(`${HOST_URI}/birthday/fetch`, {
      //   method : "GET",
      //   headers : {
      //     "Content-Type" : "application/json",
      //     "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODcyODQzMDksImV4cCI6MTY4NzI4NzkwOX0.HJ0HM0PFh2tOFMzL15KxHJUz8OI7ePQqEbAcz2RVx0o"
      //   }
      // })

      // if (response.status === 200) {
      //   console.log(await response.json())
      //   state["birthdays"] = await response.json();
      // } else {
      //   alert(`${response.statusText} Unable to Fetch Notes.`);
      // }
  
      // return response.status;
    },
  }
});

export const { setBirthday, getBirthdays } = birthdaySlice.actions;
export default birthdaySlice.reducer;