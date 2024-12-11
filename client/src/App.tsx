import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Event from "./pages/Event";
import Profile from "./pages/Profile.tsx";
import CreateEvent from "./pages/CreateEvent.tsx";
import NoPage from "./pages/NoPage";
import CreateUser from "./pages/CreateUserPage.tsx";
import Login from "./pages/LoginPage.tsx";

import "./env.Backend/env.parseConfig.ts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="login" element={<Login />} />
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
