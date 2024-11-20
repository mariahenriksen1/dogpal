import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Event from "./pages/Event";
import Profile from "./pages/Profile";
import CreateEvent from "./pages/CreateEvent";
import NoPage from "./pages/NoPage";
import CreateUser from "./pages/CreateUser.tsx";


import './env.Backend/env.parseConfig.ts'; 







function App() {
  return (
    <Router>
      <Routes>
        <Route path="createUser" element={<CreateUser />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="event" element={<Event />} />
          <Route path="profile" element={<Profile />} />
          <Route path="createEvent" element={<CreateEvent />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
