import { useState } from "react";
import Login from "./components/LoginPage/Login";
import Register from "./components/RegisterPage/Register";
import Navbar from "./components/NavBar/Navbar";
import MyRequests from "./components/MyRequestsPage/MyRequests";
import MostViewed from "./components/LandingPage/MostViewed";

function App() {
  return (
    <div>
      {/* <Login /> */}
      {/* <Register /> */}
      {/* <MyRequests /> */}
      <MostViewed />
    </div>
  );
}

export default App;
