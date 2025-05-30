import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import studentReducer from "./StudentsSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    students: studentReducer,
  },
});
