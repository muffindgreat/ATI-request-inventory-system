import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import LogIn from "./pages/LogIn/LogIn";
import Register from "./pages/Register/Register";
import Navbar from "./components/NavBar/Navbar";
import MyRequests from "./pages/MyRequests/MyRequests";
import ItemInfo from "./pages/ItemInfo/ItemInfo";
import UserProfile from "./pages/UserProfile/UserProfile";
import MatsReq from "./pages/MaterialRequisition/MatsReq";
import Home from "./pages/Home/Home";

function Layout() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/register"];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-requests" element={<MyRequests />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/item-info" element={<ItemInfo />} />
        <Route path="/material-request" element={<MatsReq />} />
      </Routes>
    </>
  );
}

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
