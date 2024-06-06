import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { StatusContextProvider } from './context/StatusContext';

import {
  SignUp,
  Login,
  Home,
  JoinedCommunities,
  Like,
  Save,
  Community,
  AllCommunity,
  CreateCommunity
} from './pages/index'

const App = () => (
  <StatusContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/joinedCommunities" element={<JoinedCommunities />} />
        <Route path="/like" element={<Like />} />
        <Route path="/save" element={<Save />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/community/:communityId" element={<Community />} />
        <Route path="/community" element={<AllCommunity />} />
        <Route path="/createCommunity" element={<CreateCommunity />} />
      </Routes>
    </BrowserRouter>
  </StatusContextProvider>
);

export default App;