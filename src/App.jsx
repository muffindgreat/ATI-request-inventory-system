import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import LogIn from "./pages/LogIn/LogIn";
import Register from "./pages/Register/Register";
import Navbar from "./components/NavBar/Navbar";
import MyRequests from "./pages/MyRequests/MyRequests";
import ItemInfo from "./pages/ItemInfo/ItemInfo";
import UserProfile from "./pages/UserProfile/UserProfile";
import RequestCart from "./pages/RequestCart/ReqCart";
import MatsReq from "./pages/MaterialRequisition/MatsReq";
import Home from "./pages/Home/Home";

function Layout() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/register"];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/request-cart" element={<RequestCart />} />
        <Route path="/my-requests" element={<MyRequests />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/item-info" element={<ItemInfo />} />
        <Route path="/material-request" element={<MatsReq />} />

        {/* Redirect "/" and all unknown routes to /home */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
