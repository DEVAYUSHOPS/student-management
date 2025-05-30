import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addStudent, updateStudent } from "../redux/StudentsSlice";

export default function StudentForm({ editing, student, onClose }) {
  const [form, setForm] = useState(
    editing
      ? {
          name: student.name,
          roll: student.roll,
          course: student.course,
          year: student.year,
        }
      : { name: "", roll: "", course: "", year: "" }
  );
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await dispatch(updateStudent({ id: student._id, data: form }));
      onClose();
    } else {
      await dispatch(addStudent(form));
      setForm({ name: "", roll: "", course: "", year: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        placeholder="Roll"
        value={form.roll}
        onChange={(e) => setForm({ ...form, roll: e.target.value })}
        required
      />
      <input
        placeholder="Course"
        value={form.course}
        onChange={(e) => setForm({ ...form, course: e.target.value })}
      />
      <input
        placeholder="Year"
        type="number"
        value={form.year}
        onChange={(e) => setForm({ ...form, year: e.target.value })}
      />
      <button type="submit">{editing ? "Update" : "Add"} Student</button>
      {editing && (
        <button type="button" onClick={onClose} style={{ marginLeft: 8 }}>
          Cancel
        </button>
      )}
    </form>
  );
}
