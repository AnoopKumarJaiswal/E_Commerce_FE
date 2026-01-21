import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./Slice"

const store = configureStore({
  reducer : {
     user : UserSlice
  }
})

export default store