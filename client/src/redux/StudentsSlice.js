import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getAuthHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const fetchStudents = createAsyncThunk(
  "students/fetch",
  async (_, { getState }) => {
    const token = getState().auth.token;
    const role = getState().auth.role;
    const url = role === `${process.env.REACT_APP_API_URL}/admin` ? `${process.env.REACT_APP_API_URL}/api/students` : `${process.env.REACT_APP_API_URL}/api/students/my`;
    const res = await axios.get(url, getAuthHeader(token));
    return res.data;
  }
);

export const addStudent = createAsyncThunk(
  "students/add",
  async (data, { getState }) => {
    const token = getState().auth.token;
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/students`, data, getAuthHeader(token));
    return res.data;
  }
);

export const updateStudent = createAsyncThunk(
  "students/update",
  async ({ id, data }, { getState }) => {
    const token = getState().auth.token;
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/students/${id}`,
      data,
      getAuthHeader(token)
    );
    return res.data;
  }
);

export const deleteStudent = createAsyncThunk(
  "students/delete",
  async (id, { getState }) => {
    const token = getState().auth.token;
    await axios.delete(`${process.env.REACT_APP_API_URL}/api/students/${id}`, getAuthHeader(token));
    return id;
  }
);

const studentSlice = createSlice({
  name: "students",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        const idx = state.items.findIndex((s) => s._id === action.payload._id);
        if (idx > -1) state.items[idx] = action.payload;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.items = state.items.filter((s) => s._id !== action.payload);
      });
  },
});

export default studentSlice.reducer;
