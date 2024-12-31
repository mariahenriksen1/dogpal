// External libraries and dependencies (third-party)
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {ToastContainer, Slide} from "react-toastify";

// Context and backend configuration
import {UserProvider} from './context/UserContext';

// Pages
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Event from "./pages/Event";
import Profile from "./pages/Profile.tsx";
import CreateEvent from "./pages/CreateEvent.tsx";
import CreateUser from "./pages/CreateUserPage.tsx";
import Login from "./pages/LoginPage.tsx";
import EditProfile from "./pages/EditProfile.tsx";
import Calendar from "./pages/Calendar.tsx";
import NoPage from "./pages/NoPage";

// Components
import ProtectRoute from "./components/Auth/ProtectRoute.tsx";

// Stylesheets
import "./App.css";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="login" element={<Login/>}/>
          <Route path="createUser" element={<CreateUser/>}/>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path="event/:id" element={<Event/>}/>
            <Route path="profile" element={
              <ProtectRoute>
                <Profile/>
              </ProtectRoute>
            }/>
            <Route path="editProfile" element={
              <ProtectRoute>
                <EditProfile/>
              </ProtectRoute>
            }/>
            <Route path="createEvent" element={
              <ProtectRoute>
                <CreateEvent/>
              </ProtectRoute>
            }/>
            <Route path="calendar" element={<Calendar/>}/>
            <Route path="*" element={<NoPage/>}/>
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
