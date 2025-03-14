import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./pages/LogIn/LogIn";
import Register from "./pages/Register/Register";
import Navbar from "./components/NavBar/Navbar";
import MyRequests from "./pages/MyRequests/MyRequests";
import MostViewed from "./components/LandingPage/MostViewed";
import Library from "./components/LandingPage/Library";
import SearchFilterBar from "./components/ItemSort/SearchFilterBar";
import ItemInfo from "./components/ItemInfo/ItemInfo";
import UserProfile from "./pages/UserProfile/UserProfile";
import MatsReq from "./pages/MaterialRequisition/MatsReq";
import ItemDetails from "./components/ItemInfo/ItemDetails";

function App() {
  return (
    <Router>
      <Routes>
        {/* <LogIn /> */}
        {/* <Register /> */}
        {/* <Navbar /> */}
        {/* <MyRequests /> */}
        {/* <MostViewed /> */}
        {/* <Library /> */}
        {/* <SearchFilterBar /> */}
        {/* <ItemInfo /> */}
        {/* <UserProfile /> */}
        {/* <MatsReq /> */}

        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-requests" element={<MyRequests />} />
        <Route path="/most-viewed" element={<MostViewed />} />
        <Route path="/library" element={<Library />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/material-request" element={<MatsReq />} />
      </Routes>
    </Router>
  );
}

export default App;
