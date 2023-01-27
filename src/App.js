import React from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Home from "./pages/Home";
import ExerciseDetail from "./pages/ExerciseDetail";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import MembershipDetail from "./components/MembershipDetail";
import db from "../src/firebase_setup/firebase";
import Form from "./components/Form";
import { app } from "./firebase_setup/firebase";
import UserProfile from "./pages/UserProfile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { OrderDetailPage } from "./pages/OrderDetailPage";
import { YourOrders } from "./pages/YourOrders";
import Dashboard from "./pages/admin/Dashboard";
import spinner from "./assets/spinner.svg";
import { AdminToolbar } from "./components/AdminToolbar";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import WithAdminAuth from "./hoc/withAdminAuth";
import { useDispatch, useSelector } from "react-redux";
import { addMembership } from "./slice/membershipSlice/membershipSlice";
import { addUser, login, logout } from "./slice/userSlice/userSlice";
import ProfileNav from "./components/ProfileNav";
import { YourSubsriptions } from "./pages/YourSubsriptions";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.users.loading);
  console.log({ loading });

  const handleLogout = () => {
    dispatch(logout());
    console.log("here");
    navigate("/");
  };

  async function fetchMembership() {
    console.log("insdie fetch");
    const response = db.collection("membership_data");
    const data = await response.get();
    const res = data.docs.map((item) => {
      return item.data();
    });
    dispatch(addMembership(res));
  }
  const isLoggedIn = () => {
    return sessionStorage.getItem("Auth Token");
  };
  useEffect(() => {
    fetchMembership();
  }, []);
  return (
    <Box sx={{ width: { xl: "100%", lg: "80%", md: "40%" } }}>
      <AdminToolbar />
      <Navbar isLoggedIn={isLoggedIn()} handleLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exercise/:id" element={<ExerciseDetail />} />
        <Route
          path="/membership/:id"
          element={<MembershipDetail isLoggedIn={isLoggedIn()} />}
        />
        <Route
          path="/profile"
          element={<UserProfile handleLogout={handleLogout} />}
        />
        <Route
          path="/login"
          element={
            <Form
              title="Login"
              type="login"
              setEmail={setEmail}
              email={email}
              password={password}
              setPassword={setPassword}
              name={name}
              setName={setName}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Form
              title="Register"
              type="register"
              setEmail={setEmail}
              email={email}
              password={password}
              setPassword={setPassword}
              name={name}
              setName={setName}
            />
          }
        />
        <Route path="/orderDetail" element={<OrderDetailPage />} />
        <Route path="/yourorders" element={<YourOrders />} />
        <Route path="/subscriptions" element={<YourSubsriptions />} />

        <Route
          path="/admin/dashboard"
          element={
            <WithAdminAuth>
              <Dashboard />
            </WithAdminAuth>
          }
        />
      </Routes>

      <ToastContainer />
    </Box>
  );
}

export default App;
