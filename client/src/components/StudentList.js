import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent } from "../redux/StudentsSlice";
import StudentForm from "./StudentForm";

export default function StudentList() {
  const students = useSelector((state) => state.students.items);
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();
  const [editingId, setEditingId] = useState(null);

  if (!students.length) return <p>No students found.</p>;

  return (
    <ul>
      {students.map((student) => (
        <li
          key={student._id}
          style={{
            marginBottom: 18,
            background: "#f1f8ff",
            padding: 12,
            borderRadius: 8,
          }}
        >
          {editingId === student._id ? (
            <StudentForm
              editing
              student={student}
              onClose={() => setEditingId(null)}
            />
          ) : (
            <>
              <b>{student.name}</b> (Roll: {student.roll})<br />
              Course: {student.course || "-"} | Year: {student.year || "-"}
              {role === "admin" && (
                <div style={{ marginTop: 8 }}>
                  <button
                    onClick={() => setEditingId(student._id)}
                    style={{ marginRight: 8 }}
                  >
                    Edit
                  </button>
                  <button onClick={() => dispatch(deleteStudent(student._id))}>
                    Delete
                  </button>
                </div>
              )}
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
