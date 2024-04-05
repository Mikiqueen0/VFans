// import { 
//   SignUp,
//   Login 
// } from './pages'
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Following from "./pages/Following";
import Like from "./pages/Like";
import Save from "./pages/Save";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/following" element={<Following />} />
      <Route path="/like" element={<Like />} />
      <Route path="/save" element={<Save />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  </BrowserRouter>
);

export default App;