import { useState } from "react";
import LogIn from "./pages/LogIn/LogIn";
import Login from "./components/LoginPage/Login";
// import Register from "./components/RegisterPage/Register";
// import Navbar from "./components/NavBar/Navbar";
// import MyRequests from "./pages/MyRequests/MyRequests";
// import MostViewed from "./components/LandingPage/MostViewed";
// import Library from "./components/LandingPage/Library";
// import SearchFilterBar from "./components/ItemSort/SearchFilterBar";
// // import ItemInfo from "./components/ItemInfo/ItemInfo";
// import UserProfile from "./components/UserProfile/UserProfile";
// import MatsReq from "./pages/MaterialRequisition/MatsReq";
// import ItemInfo from "./components/ItemInfo/ItemDetails";
import Library from "./components/LandingPage/Library";
import UserProfile from "./components/UserProfile/UserProfile";
import SearchFilterBar from "./components/ItemSort/SearchFilterBar";
import MatsReq from "./pages/MaterialRequisition/MatsReq";
import ReqCart from "./pages/RequestCart/ReqCart";

function App() {
  return (
    <div>
      <LogIn />
      {/* <Register /> */}
      {/* <MyRequests /> */}
      {/* <MostViewed /> */}
      {/* <Library /> */}
      {/* <SearchFilterBar /> */}
<<<<<<< HEAD
      <Navbar/>
      {/* <MatsReq/> */}
      <ReqCart/>
=======
      {/* <ItemInfo /> */}
      {/* <UserProfile /> */}
      {/* <MatsReq /> */}
      {/* // <Navbar/>
      // <MatsReq/> */}
>>>>>>> 6f399c53bda7ac3b63f1ca2d306d86678e56a9c0
    </div>
  );
}

export default App;