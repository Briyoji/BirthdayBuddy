import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setAppError } from "./utilSlice";

const HOST_URI = process.env.REACT_APP_API_URL;

const initialState = {
  authData : {
    token : null,
    status : null,
  },
  errPersonalData : '‎',
  errCredentials : '‎',
};


const authSlice = createSlice({
  name : "auth",
  initialState,
  reducers : {
    setError : (state, action) => {
      state[Object.keys(action.payload)[0]] = action.payload[Object.keys(action.payload)[0]]
    }
  },
  extraReducers : builder => {
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.authData = {
        status : true,
        token : action.payload,
      };
    })

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.authData = {
        status : action.payload.authToken?true:false,
        token : action.payload.authToken,
      };
    })

    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.authData.status = action.payload.status;
      state.authData.token = action.payload.token;
    })
  }
});

export const signupUser = createAsyncThunk('auth/signupUser', async (signupData, store) => {

  const response = await fetch(`${HOST_URI}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `${store.getState().auth.authData.token}`
    },
    body: JSON.stringify(signupData)
  })

  if (response.ok) { 
    const data = await response.json();
    return data;
  } else {

    if (response.status === 500) {
      store.dispatch(setAppError("Internal Server Error!"))
      return -1;
    }

    const data = await response.json();

    // Handling Validation Errors
    if (data.hasOwnProperty("errors")) {
      const errorTypes = new Set(["email", "password"]);
      console.log(data.errors)
      data.errors.forEach(error => {
        const errorType = errorTypes.has(error.path)?'errCredentials':'errPersonalData'
        if (store.getState().auth[errorType] === '‎') store.dispatch(setError({[errorType]: error.msg}))
      });

      return -1;
    }
  }
})

export const loginUser = createAsyncThunk('auth/loginUser', async (loginData, store) => {

  const response = await fetch(`${HOST_URI}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `${store.getState().auth.authData.token}`
    },
    body: JSON.stringify(loginData)
  })

  if (response.ok) { 
    const data = await response.json();
    return data;
  } else {

    if (response.status === 500) {
      store.dispatch(setAppError("Internal Server Error!"))
      return -1;
    }

    const data = await response.json();

    // Handling Validation Errors
    if (data.hasOwnProperty("errors")) {
      data.errors.forEach(error => {
        if (store.getState().auth['errCredentials'] === '‎') store.dispatch(setError({'errCredentials': error.msg}))
      });

      return -1;
    }
  }
})

export const getUserDetails = createAsyncThunk('auth/getUserDetails', async (_, { getState, dispatch }) => {
  const response = await fetch(`${HOST_URI}/auth/fetchUser`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${getState().auth.authData.token}`
    }
  })

  if (response.ok) {
    // const data = await response.json();
    return {status: true, token: getState().auth.authData.token};
  } else {

    if (response.status === 500) {
      dispatch(setAppError("Internal Server Error!"))
      return {status: false, token: getState().auth.authData.token};
    }
    
    return {status: false, token: null};
    }
})

export const { setError } = authSlice.actions;
export default authSlice.reducer;