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
import { auth, db } from "./config/firebaseConfig";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import "./app.css";
import Button from "@mui/material/Button";
import { Modal, Box, Typography } from "@mui/material";

function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const hideNavbarAndFooterRoutes = ["/login", "/register"];

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null); // track uid separately
  const [userData, setUserData] = useState(null);
  const [showProfilePopup, setShowProfilePopup] = useState(false);

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
          font-family: 'Lato', sans-serif;
        }
      `;
      document.head.appendChild(style);
      setUserId(user ? user.uid : null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!userId) {
      setUserData(null);
      setShowProfilePopup(false);
      return;
    }

    const userRef = doc(db, "User", userId);
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserData(data);

        // ✅ Normalize values before checking
        const section =
          typeof data.section === "string" ? data.section.trim() : "";
        const phoneNumber =
          typeof data.phoneNumber === "string" ? data.phoneNumber.trim() : "";
        const designation =
          typeof data.designation === "string" ? data.designation.trim() : "";

        if (!section || !phoneNumber || !designation) {
          setShowProfilePopup(true);
        } else {
          setShowProfilePopup(false);
        }
      } else {
        setUserData(null);
        setShowProfilePopup(false);
      }
    });

    return () => unsubscribe();
  }, [userId]);

  // Blocking pop-up JSX
  const ProfilePopup = () => (
    <Modal
      open={true}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      disableEscapeKeyDown
      hideBackdrop={false}
      sx={{ zIndex: 9999 }}
    >
      <div className="h-screen max-h-full">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 1,
            width: { xs: "60%", sm: "50%", md: "40%" },
            maxHeight: "80vh",
            overflow: "auto",
            textAlign: "center",
          }}
        >
          <Typography id="modal-title" variant="h6" sx={{ fontWeight: "bold" }}>
            Complete Your Account Setup
          </Typography>
          <Box id="modal-description" sx={{ mt: 2 }}>
            Please finish your account setup by providing your Section/Office,
            Designation, and Phone Number.
          </Box>
          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              fullWidth
              color="success"
              sx={{ borderRadius: 1, textTransform: "none" }}
              onClick={() => navigate("/user-profile")}
            >
              Continue
            </Button>
          </Box>
        </Box>
      </div>
    </Modal>
  );

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <ToastContainer />
      {!hideNavbarAndFooterRoutes.includes(location.pathname) && <Navbar />}

      <main style={{ flexGrow: 1 }}>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/item-info/:id" element={<ItemInfo />} />

            <Route element={<ProtectedRoute isProtected={true} />}>
              <Route path="/request-cart" element={<RequestCart />} />
              <Route path="/my-requests" element={<MyRequests />} />
              <Route path="/my-requests-1" element={<MyRequests1 />} />
              <Route path="/user-profile" element={<UserProfile />} />
              <Route path="/material-request-form" element={<MatsReq />} />
            </Route>

            <Route element={<ProtectedRoute isProtected={false} />}>
              <Route path="/login" element={<LogIn />} />
              <Route path="/register" element={<Register />} />
            </Route>

            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </Suspense>
      </main>

      {!hideNavbarAndFooterRoutes.includes(location.pathname) && <Footer />}
      {isAuthenticated &&
        showProfilePopup &&
        location.pathname !== "/user-profile" && <ProfilePopup />}
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
