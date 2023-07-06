// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import { persistReducer } from "redux-persist";

// // import { Storage } from "redux-persist";
// import storage from 'redux-persist/lib/storage'

// import utilSlice from "./utilSlice";
// import birthdaySlice from "./birthdaySlice";
// import authSlice from "./authSlice";

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["auth"],
// };

// const persistedReducer = persistReducer(persistConfig, combineReducers({
//   utils : utilSlice,
//   auth : authSlice,
//   birthday : birthdaySlice
// }));

// const store = configureStore({ reducer: persistedReducer });

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import { combineReducers } from "redux";

import utilSlice from "./utilSlice";
import birthdaySlice from "./birthdaySlice";
import authSlice from "./authSlice";
import userSlice from "./userSlice";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["auth"],
};

const reducers = combineReducers({
  utils: utilSlice,
  auth: authSlice,
  birthday: birthdaySlice,
  user: userSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
