import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import { UserContextProvider } from "./context/fetchuser";
import { StatusContextProvider } from "./context/StatusContext";
import {
  SignUp,
  Login,
  Home,
  JoinedCommunities,
  Like,
  Save,
  Community,
  AllCommunity,
  CreateCommunity,
  Profile,
  JoinedCommunity,
} from "./pages/index";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";

const App = () => {
  return (
    <StatusContextProvider>
        <BrowserRouter>
          <AuthProvider>
            <UserContextProvider>
              <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/joinedCommunities" element={<JoinedCommunities />} />
                <Route path="/like" element={<Like />} />
                <Route path="/save" element={<Save />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/community/:communityName" element={<Community />} />
                <Route path="/community" element={<AllCommunity />} />
                <Route path="/createCommunity" element={<CreateCommunity />} />
                <Route path="/profile/:profileUsername" element={<Profile />} />
                <Route
                  path="/:profileUsername/joinedCommunity"
                  element={<JoinedCommunity />}
                />
              </Routes>
            </UserContextProvider>
          </AuthProvider>
        </BrowserRouter>
    </StatusContextProvider>
  );
};

export default App;
