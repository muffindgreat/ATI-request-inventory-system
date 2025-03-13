import { useState } from "react";
import Login from "./components/LoginPage/Login";
import Register from "./components/RegisterPage/Register";
import Navbar from "./components/NavBar/Navbar";
import MyRequests from "./pages/MyRequests/MyRequests";
import MostViewed from "./components/LandingPage/MostViewed";
//import ItemInfo from "./components/ItemInfo/ItemDetails";
//import Library from "./components/LandingPage/Library";
//import UserProfile from "./components/UserProfile";
//import SearchFilterBar from "./components/ItemSort/SearchFilterBar";
import MatsReq from "./pages/MaterialRequisition/MatsReq";
import ReqCart from "./pages/RequestCart/ReqCart";


function App() {
  return (
    <div>
      {/* <Login /> */}
      {/* <Register /> */}
      {/* <MyRequests /> */}
      {/* <MostViewed /> */}
      {/* <Library /> */}
      {/* <SearchFilterBar /> */}
      <Navbar/>
      {/* <MatsReq/> */}
      <ReqCart/>
    </div>
  );
}

export default App;
