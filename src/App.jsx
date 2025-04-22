import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useState, useEffect, Suspense } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./context/Protected";
import LogIn from "./pages/LogIn/LogIn";
import Register from "./pages/Register/Register";
import Navbar from "./components/NavBar/Navbar";
import MyRequests from "./pages/MyRequests/MyRequests";
import MyRequests1 from "./pages/MyRequests/MyRequests1";
import ItemInfo from "./pages/ItemInfo/ItemInfo";
import UserProfile from "./pages/UserProfile/UserProfile";
import RequestCart from "./pages/RequestCart/RequestCart1";
import MatsReq from "./pages/MaterialRequisition/MatsReq";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import { auth } from "./config/firebaseConfig";
import { ToastContainer } from "react-toastify";
import "./app.css"; // Import your app.css file

function Layout() {
  const location = useLocation();
  const hideNavbarAndFooterRoutes = ["/login", "/register"];
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      const style = document.createElement("style");
      style.textContent = `
        html, body, #root {
          margin: 0;
          padding: 0;
          height: 100vh;
          width: 100vw;
          overflow-x: hidden;
          font-family: 'Lato', sans-serif;  /* Apply Lato Regular font globally */
        }
      `;
      document.head.appendChild(style);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <ToastContainer />
      {!hideNavbarAndFooterRoutes.includes(location.pathname) && <Navbar />}

      <main style={{ flexGrow: 1 }}>
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* Public routes */}
            <Route path="/home" element={<Home />} />
            <Route path="/item-info/:id" element={<ItemInfo />} />

            {/* Protected Routes - If not logged in, redirect to home */}
            <Route element={<ProtectedRoute isProtected={true} />}>
              <Route path="/request-cart" element={<RequestCart />} />
              <Route path="/my-requests" element={<MyRequests />} />
              <Route path="/my-requests-1" element={<MyRequests1 />} />
              <Route path="/user-profile" element={<UserProfile />} />
              <Route path="/material-request-form" element={<MatsReq />} />
            </Route>

            {/* Restricted Routes - If logged in, redirect to home */}
            <Route element={<ProtectedRoute isProtected={false} />}>
              <Route path="/login" element={<LogIn />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* Redirect to home for undefined routes */}
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </Suspense>
      </main>

      {!hideNavbarAndFooterRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout />
      </Router>
    </AuthProvider>
  );
}

export default App;
