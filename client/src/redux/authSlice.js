import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

export const login = createAsyncThunk("auth/login", async (data) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, data);
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("role", res.data.role);
  return res.data;
});

export const register = createAsyncThunk("auth/register", async (data) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, data);
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("role", res.data.role);
  return res.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: { token: token || null, role: role || null },
  reducers: {
    logout(state) {
      state.token = null;
      state.role = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.role = action.payload.role;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.role = action.payload.role;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
