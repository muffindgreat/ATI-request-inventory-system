import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./pages/LogIn/LogIn";
import Register from "./pages/Register/Register";
import Navbar from "./components/NavBar/Navbar";
import MyRequests from "./pages/MyRequests/MyRequests";
// import MostViewed from "./components/LandingPage/MostViewed";
import Library from "./components/LandingPage/Library";
import SearchFilterBar from "./components/ItemSort/SearchFilterBar";
import ItemInfo from "./components/ItemInfo/ItemInfo";
import UserProfile from "./pages/UserProfile/UserProfile";
import MatsReq from "./pages/MaterialRequisition/MatsReq";

function App() {
  return (
    <div>
      <LogIn />
      {/* <Register /> */}
      {/* <MyRequests /> */}
      {/* <MostViewed /> */}
      {/* <Library /> */}
      {/* <SearchFilterBar /> */}
      {/* <ItemInfo /> */}
      {/* <UserProfile /> */}
      {/* <MatsReq /> */}
      {/* // <Navbar/>
      // <MatsReq/> */}
    </div>
  );
}

export default App;
