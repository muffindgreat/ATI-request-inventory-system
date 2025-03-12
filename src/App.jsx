import { useState } from "react";
import Login from "./components/LoginPage/Login";
import Register from "./components/RegisterPage/Register";
import Navbar from "./components/NavBar/Navbar";
import MyRequests from "./pages/MyRequests/MyRequests";
import MostViewed from "./components/LandingPage/MostViewed";
import ItemInfo from "./components/ItemInfo/ItemDetails";
import Library from "./components/LandingPage/Library";

function App() {
  return (
    <div>
      {/* <Login /> */}
      {/* <Register /> */}
      <Navbar />
      <MyRequests />
      {/* <MostViewed /> */}
      {/* <ItemInfo /> */}
      {/* <Library /> */}
    </div>
  );
}

export default App;
