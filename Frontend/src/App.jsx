import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import { UserContextProvider } from "./context/fetchuser";
import { StatusContextProvider } from "./context/StatusContext";
import { CommunityContextProvider } from "./context/FetchCommunity";
import { PostProvider } from './context/PostContext';
import { SavedPostsProvider } from './context/SavedPostsContext';
import {
  SignUp,
  Login,
  Home,
  UserJoinedCommunity,
  Like,
  Save,
  Community,
  AllCommunity,
  CreateCommunity,
  Profile,
  CommunityMember,
  FullPost,
  JoinedCommunities
} from "./pages/index";
import axios from "axios";
import ScrollToTop from "./utils/ScrollToTop";
axios.defaults.baseURL = "http://localhost:3000";

const App = () => {
  return (
      <BrowserRouter>
        <StatusContextProvider>
        <AuthProvider>
        <UserContextProvider>
        <CommunityContextProvider>
        <PostProvider>
        <SavedPostsProvider>
        <ScrollToTop />
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/joinedCommunities/:userID" element={<JoinedCommunities />} />
            <Route path="/:username/joinedCommunities" element={<UserJoinedCommunity />} />
            <Route path="/like" element={<Like />} />
            <Route path="/save/:username" element={<Save />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/community/:communityID" element={<Community />} />
            <Route path="/community" element={<AllCommunity />} />
            <Route path="/createCommunity" element={<CreateCommunity />} />
            <Route path="/profile/:profileUsername" element={<Profile />} />
            <Route path="/joinedCommunity/:communityID" element={<CommunityMember />} />
            <Route path="/post/:postID" element={<FullPost />} />
            <Route path="/post/:postID/:section" element={<FullPost />} />
          </Routes>
        </SavedPostsProvider>
        </PostProvider>
        </CommunityContextProvider>
        </UserContextProvider>
        </AuthProvider>
        </StatusContextProvider>
      </BrowserRouter>
  );
};

export default App;
