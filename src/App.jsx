import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { StatusContextProvider } from './context/StatusContext';
import { UserContextProvider } from './context/UserContext';

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
  JoinedCommunity
} from './pages/index'

const App = () => (
  <StatusContextProvider>
  <UserContextProvider>
    <BrowserRouter>
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
        <Route path="/:profileUsername/joinedCommunity" element={<JoinedCommunity />} />
      </Routes>
    </BrowserRouter>
  </UserContextProvider>
  </StatusContextProvider>
);

export default App;