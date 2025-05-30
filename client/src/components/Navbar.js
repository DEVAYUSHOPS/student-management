import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { token, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav>
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "#1976d2",
          fontWeight: "bold",
          fontSize: 22,
        }}
      >
        Student Manager
      </Link>
      <div>
        {token ? (
          <>
            <span style={{ marginRight: 12, color: "#555" }}>{role}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ marginRight: 12 }}>
              Login
            </Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
