import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Profile from "./pages/private/Profile/Profile";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import NavbarCostum from "./layouts/Navbar/NavbarCustom";
import PrivateRoute from "./components/PrivateRoute";
import { useAuth } from "./services/userContext";
import { House, LogOut, User, LogIn, UserPlus, Contact, Ambulance, Earth } from "lucide-react";
import LandingPage from "./pages/LandingPage/LandingPage";
import ContactUs from "./pages/ContactUs/ContactUs";
import EmergencyContacts from "./pages/EmergencyContacts/EmergencyContacts";
import AnimalPedia from "./pages/AnimalPedia/AnimalPedia";

function App() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // Define navItems based on the currentUser state
  const navItems = currentUser
    ? [
        {
          label: "Home",
          url: "/",
          access: ["guest", "user"],
          icon: <House />,
        },
        {
          label: "Profile",
          url: "/profile",
          access: ["user"],
          icon: <User />,
        },
        {
          label: "Emergency Contacts",
          url: "/EmergencyContacts",
          access: ["guest", "user"],
          icon: <Ambulance />,
        },
        {
          label: "AnimalPedia",
          url: "/AnimalPedia",
          access: ["guest", "user"],
          icon: <Earth />,
        },
        {
          label: "Contact us",
          url: "/ContactUs",
          access: ["guest", "user"],
          icon: <Contact />,
        },
        {
          label: "Sign Out",
          url: "/",
          access: ["user"],
          icon: <LogOut />,
          action: () => {
            logout();
            navigate("/"); // Redirect to the landing page after logout
          },
        },
      ]
    : [
        {
          label: "Home",
          url: "/",
          access: ["guest"],
          icon: <House />,
        },
        {
          label: "Emergency Contacts",
          url: "/EmergencyContacts",
          access: ["guest", "user"],
          icon: <Ambulance />,
        },
        {
          label: "AnimalPedia",
          url: "/AnimalPedia",
          access: ["user"],
          icon: <Earth />,
        },
        {
          label: "Contact us",
          url: "/ContactUs",
          access: ["guest", "user"],
          icon: <Contact />,
        },
        {
          label: "Login",
          url: "/login",
          access: ["guest"],
          icon: <LogIn />,
        },
        {
          label: "Sign Up",
          url: "/signup",
          access: ["guest"],
          icon: <UserPlus />,
        },
      ];

  useEffect(() => {
    if (
      currentUser &&
      (window.location.pathname === "/login" ||
        window.location.pathname === "/signup")
    ) {
      navigate("/"); // Redirect logged-in users from /login and /signup to the landing page
    }
  }, [currentUser, navigate]);

  return (
    <>
      <NavbarCostum navItems={navItems} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/EmergencyContacts" element={<EmergencyContacts />} />
        <Route
          path="/AnimalPedia"
          element={<AnimalPedia />}
        />
        <Route
          path="/login"
          element={currentUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={currentUser ? <Navigate to="/" /> : <SignUp />}
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
