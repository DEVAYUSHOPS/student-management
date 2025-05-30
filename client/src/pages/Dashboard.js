import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../redux/StudentsSlice";
import Navbar from "../components/Navbar";
import StudentForm from "../components/StudentForm";
import StudentList from "../components/StudentList";

export default function Dashboard() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) dispatch(fetchStudents());
  }, [dispatch, token]);

  return (
    <div>
      <Navbar />
      <div className="app-container">
        <h2>Student Dashboard</h2>
        <StudentForm />
        <StudentList />
      </div>
    </div>
  );
}
