import { useState } from "react";
import Login from "./components/LoginPage/Login";
import Register from "./components/RegisterPage/Register";
import Navbar from "./components/NavBar/Navbar";
import MyRequests from "./components/MyRequestsPage/MyRequests";

function App() {
  return (
    <div>
      {/* <Login /> */}
      {/* <Register /> */}
      <MyRequests />
    </div>
  );
}

export default App;
