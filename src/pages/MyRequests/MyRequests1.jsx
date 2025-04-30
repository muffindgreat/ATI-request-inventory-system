import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Container,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../../config/firebaseConfig";
import useToast from "../../components/Toastify/useToast";
import RequestTabs from "../../components/MyRequests/RequestTabs";
import RequestList from "../../components/MyRequests/RequestList";
import CustomCardHeader from "../../components/UI/CustomCardHeader";
import BackgroundImage from "../../components/UI/BackgroundImage";

export default function MyRequests() {
  const [tabIndex, setTabIndex] = useState(0);
  const [allRequests, setAllRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const showToast = useToast();

  const handleChange = (event, newIndex) => setTabIndex(newIndex);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/login");
        return;
      }

      try {
        const q = query(
          collection(db, "Request"),
          where("email", "==", user.email)
        );
        const querySnapshot = await getDocs(q);

        const requests = await Promise.all(
          querySnapshot.docs.map(async (docSnap) => {
            const data = docSnap.data();
            const materials = await Promise.all(
              (data.materialRequested || []).map(async (mat) => {
                try {
                  const inventorySnap = await getDoc(
                    doc(db, "Inventory", mat.itemID)
                  );
                  const inventory = inventorySnap.exists()
                    ? inventorySnap.data()
                    : {};
                  return {
                    id: mat.itemID,
                    name: inventory?.title || "No Title",
                    type: mat.type,
                    quantity: mat.quantity,
                    imageUrl:
                      inventory?.imageUrl || "https://via.placeholder.com/150",
                    bannerProgram: inventory?.bannerProgram || [],
                  };
                } catch {
                  return { ...mat, name: "Unknown Item" };
                }
              })
            );

            return {
              id: docSnap.id,
              reqNo: data.reqNo || "N/A",
              status: data.status || "Pending",
              date: data.date?.toDate?.().toLocaleString() || "No Date",
              dateNeeded: data.dateNeeded || "",
              acceptedDate:
                data.acceptedDate?.toDate?.().toLocaleString() || "",
              approvedDate:
                data.approvedDate?.toDate?.().toLocaleString() || "",
              receivedDate:
                data.receivedDate?.toDate?.().toLocaleString() || "",
              purpose: data.purpose || "",
              program: data.program || "",
              section: data.section || "",
              remarks: data.remarks || "",
              materials,
            };
          })
        );

        setAllRequests(
          requests.sort((a, b) => new Date(b.date) - new Date(a.date))
        );
      } catch (err) {
        console.error("Error loading requests", err);
        showToast("Failed to load your requests. Please try again.", "error");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const filtered = {
    0: allRequests,
    1: allRequests.filter((r) => r.status === "Pending"),
    2: allRequests.filter(
      (r) => r.status === "Accepted" || r.status === "Approved"
    ),
    3: allRequests.filter((r) => r.status === "Received"),
  };

  return (
    <Box sx={{ position: "relative" }}>
      <BackgroundImage />

      <Container maxWidth="lg" sx={{ pt: { xs: 12, sm: 14, md: 16 }, pb: 10 }}>
        <Card elevation={3} sx={{ borderRadius: 2 }}>
          <CustomCardHeader title="My Requests" showBackButton />
          <CardContent>
            <RequestTabs tabIndex={tabIndex} handleChange={handleChange} />
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              {loading ? (
                <CircularProgress sx={{ my: 2 }} />
              ) : (
                <RequestList
                  items={filtered[tabIndex] || []}
                  tabIndex={tabIndex}
                />
              )}
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
