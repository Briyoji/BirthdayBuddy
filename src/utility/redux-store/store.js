import { configureStore } from "@reduxjs/toolkit";

import utilSlice from "./utilSlice";
import birthdaySlice from "./birthdaySlice";

const store = configureStore({reducer: {
  utils : utilSlice,
  birthday : birthdaySlice
}});

export default store;