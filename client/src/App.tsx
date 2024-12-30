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
import EditProfile from "./pages/EditProfile.tsx";
import "./env.Backend/env.parseConfig.ts";
import { ToastContainer, Slide } from "react-toastify";
import { UserProvider } from './context/UserContext'; 
import Calendar from "./pages/Calendar.tsx";


function App() {
  return (
    <UserProvider> 

    <Router>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="createUser" element={<CreateUser />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="event" element={<Event />} />
          <Route path="profile" element={<Profile />} />
          <Route path="editProfile" element={<EditProfile />} />
          <Route path="createEvent" element={<CreateEvent />} />
          <Route path="*" element={<NoPage />} />
          <Route path="calendar" element={<Calendar />} />

        </Route>
      </Routes>



      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
    </Router>
    </UserProvider>
  );
}

export default App;
