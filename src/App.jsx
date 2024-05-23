import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import JoinedCommunities from "./pages/JoinedCommunities";
import Like from "./pages/Like";
import Save from "./pages/Save";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/joinedCommunities" element={<JoinedCommunities />} />
      <Route path="/like" element={<Like />} />
      <Route path="/save" element={<Save />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  </BrowserRouter>
);

export default App;