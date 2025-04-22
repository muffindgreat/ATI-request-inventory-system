import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { auth, db } from "../../config/firebaseConfig";
import {
  collection,
  query,
  where,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import useToast from "../../components/Toastify/useToast";

import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import RequestList from "../../components/MyRequests/RequestList";
import RequestTabs from "../../components/MyRequests/RequestTabs";
import BackgroundImage from "../../components/UI/BackgroundImage";
import CustomCardHeader from "../../components/UI/CustomCardHeader";

export default function MyRequests() {
  const [tabIndex, setTabIndex] = useState(0);
  const [allRequests, setAllRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const showToast = useToast();
  const handleChange = (event, newIndex) => setTabIndex(newIndex);
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const q = query(
            collection(db, "Request"),
            where("email", "==", user.email)
          );
          const querySnapshot = await getDocs(q);

          const fetchedRequests = await Promise.all(
            querySnapshot.docs.map(async (requestDoc) => {
              const data = requestDoc.data();

              const materials = await Promise.all(
                (data.materialRequested || []).map(async (mat) => {
                  const inventoryRef = doc(db, "Inventory", mat.itemID); // ✅ now this won't break
                  const inventorySnap = await getDoc(inventoryRef);
                  const inventoryData = inventorySnap.exists()
                    ? inventorySnap.data()
                    : {};

                  return {
                    id: mat.itemID,
                    name: inventorySnap.data()?.title || "Unknown Material",
                    type: mat.type,
                    quantity: mat.quantity,
                    previousQuantity: mat.previousQuantity ?? null,
                    imageUrl:
                      inventoryData.imageUrl ||
                      "https://via.placeholder.com/150",
                    bannerProgram: inventoryData.bannerProgram || [],
                  };
                })
              );

              return {
                id: requestDoc.id,
                reqNo: data.reqNo,
                status: data.status,
                date: data.date?.toDate
                  ? data.date.toDate().toLocaleString()
                  : "No Date",
                dateNeeded: data.dateNeeded || "",
                acceptedDate: data.acceptedDate?.toDate
                  ? data.acceptedDate.toDate().toLocaleString()
                  : "",
                approvedDate: data.approvedDate?.toDate
                  ? data.approvedDate.toDate().toLocaleString()
                  : "",
                receivedDate: data.receivedDate?.toDate
                  ? data.receivedDate.toDate().toLocaleString()
                  : "",
                purpose: data.purpose || "",
                program: data.program || "",
                section: data.section || "",
                remarks: data.remarks || "",
                materials,
              };
            })
          );

          setAllRequests(
            fetchedRequests.sort((a, b) => {
              const dateA = new Date(a.date);
              const dateB = new Date(b.date);
              return dateB - dateA; // newest first
            })
          );
        } catch (err) {
          showToast(
            "Failed to fetch your requests. Please try again later.",
            "error"
          );
        } finally {
          setLoading(false);
        }
      } else {
        showToast("Session expired. Please log in again.", "warning");
        setLoading(false);
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  const pendingRequests = allRequests.filter((req) => req.status === "Pending");
  const processedRequests = allRequests.filter(
    (req) => req.status === "Accepted" || req.status === "Approved"
  );
  const completedRequests = allRequests.filter(
    (req) => req.status === "Received"
  );

  const requestMap = {
    0: allRequests,
    1: pendingRequests,
    2: processedRequests,
    3: completedRequests,
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Helmet>
        <title>My Requests | ATI CALABARZON e-Library</title>
      </Helmet>
      <BackgroundImage />

      <Container maxWidth="lg" sx={{ pt: { xs: 12, sm: 14, md: 16 }, mb: 10 }}>
        <Card elevation={3} sx={{ borderRadius: 2 }}>
          <CustomCardHeader title="My Requests" showBackButton />
          <CardContent>
            <RequestTabs tabIndex={tabIndex} handleChange={handleChange} />
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              {loading ? (
                <CircularProgress sx={{ my: 2 }} />
              ) : (
                <RequestList
                  items={requestMap[tabIndex] || []}
                  tabIndex={tabIndex}
                  sx={{ py: 5 }}
                />
              )}
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
