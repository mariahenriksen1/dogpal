// External libraries and dependencies (third-party)
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";

// Context and backend configuration
import { UserProvider } from "./context/UserContext.tsx";
import ProtectRoute from "./components/Auth/ProtectRoute.tsx";

// Pages
import Layout from "./pages/Layout.tsx";
import Home from "./pages/Home.tsx";
import Event from "./pages/Event.tsx";
import Profile from "./pages/Profile.tsx";
import CreateEvent from "./pages/CreateEvent.tsx";
import CreateUser from "./pages/CreateUserPage.tsx";
import Login from "./pages/LoginPage.tsx";
import EditProfile from "./pages/EditProfile.tsx";
import Calendar from "./pages/Calendar.tsx";
import NoPage from "./pages/NoPage.tsx";
import SavedEvents from "./pages/SavedEvents.tsx";
import TestJoinEventShowAttendes from "./pages/TestShowAttendes.tsx";
import User from "./pages/User.tsx";

import "./App.css";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="Test" element={<TestJoinEventShowAttendes />} />

          <Route path="login" element={<Login />} />
          <Route path="createUser" element={<CreateUser />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="event/:id" element={<Event />} />
            <Route path={"user/:id"} element={<User />} />
            <Route
              path="profile"
              element={
                <ProtectRoute>
                  <Profile />
                </ProtectRoute>
              }
            />
            <Route
              path="editProfile"
              element={
                <ProtectRoute>
                  <EditProfile />
                </ProtectRoute>
              }
            />
            <Route
              path="saved"
              element={
                <ProtectRoute>
                  <SavedEvents />
                </ProtectRoute>
              }
            />
            <Route
              path="createEvent"
              element={
                <ProtectRoute>
                  <CreateEvent />
                </ProtectRoute>
              }
            />
            <Route path="calendar" element={<Calendar />} />
            <Route path="*" element={<NoPage />} />
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
          closeButton={false}
        />
      </Router>
    </UserProvider>
  );
}

export default App;
