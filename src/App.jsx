import { useState } from "react";
import Login from "./components/LoginPage/Login";
import Register from "./components/RegisterPage/Register";
import Navbar from "./components/NavBar/Navbar";
import MyRequests from "./components/MyRequestsPage/MyRequests";
import MostViewed from "./components/LandingPage/MostViewed";
import Library from "./components/LandingPage/Library";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <div>
      {/* <Login /> */}
      {/* <Register /> */}
      {/* <MyRequests /> */}
      {/* <MostViewed /> */}
      {/* <Library /> */}
      {/* <Navbar /> */}
      <UserProfile />
    </div>
  );
}

export default App;
