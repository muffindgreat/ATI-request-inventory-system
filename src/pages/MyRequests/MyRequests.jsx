import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { auth, db } from "../../config/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import RequestList from "../../components/MyRequests/RequestList";
import RequestTabs from "../../components/MyRequests/RequestTabs";
import BackgroundImage from "../../components/UI/BackgroundImage";
import CustomCardHeader from "../../components/UI/CustomCardHeader";

export default function MyRequests() {
  const [tabIndex, setTabIndex] = useState(0);
  const [allRequests, setAllRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChange = (event, newIndex) => setTabIndex(newIndex);

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
            querySnapshot.docs.map(async (doc) => {
              const data = doc.data();
  
              // Fetch inventory details for each requested material
              const materials = await Promise.all(
                (data.materialRequested || []).map(async (mat) => {
                  const inventoryQuery = query(
                    collection(db, "Inventory"),
                    where("title", "==", mat.title) // Match material with inventory
                  );
                  const inventorySnapshot = await getDocs(inventoryQuery);
                  const inventoryData =
                    inventorySnapshot.docs.length > 0
                      ? inventorySnapshot.docs[0].data()
                      : {};
  
                  return {
                    name: mat.title,
                    type: mat.type,
                    quantity: mat.quantity,
                    imageUrl:
                      inventoryData.imageUrl || "https://via.placeholder.com/150",
                    bannerProgram: inventoryData.bannerProgram || [],
                  };
                })
              );
  
              return {
                id: doc.id,
                reqNo: data.reqNo,
                status: data.status,
                date: data.date?.toDate
                  ? data.date.toDate().toLocaleString()
                  : "No Date",
                dateNeeded: data.dateNeeded?.toDate
                  ? data.dateNeeded.toDate().toLocaleString()
                  : "No Date",
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
                materials, // Updated with Inventory Data
              };
            })
          );
  
          setAllRequests(fetchedRequests);
        } catch (err) {
          console.error("Error fetching requests:", err);
        } finally {
          setLoading(false);
        }
      }
    });
  
    return () => unsubscribe();
  }, []);
  

  const pendingRequests = allRequests.filter((req) => req.status === "Pending");
  const processedRequests = allRequests.filter(
    (req) => req.status === "Accepted" || req.status === "Approved"
  );
  const completedRequests = allRequests.filter(
    (req) => req.status === "Completed"
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
      <BackgroundImage />

      <Container maxWidth="lg" sx={{ pt: { xs: 12, sm: 14, md: 16 }, mb: 10 }}>
        <Card elevation={3} sx={{ borderRadius: 2 }}>
          <CustomCardHeader title="My Requests" showBackButton />
          <CardContent>
            <RequestTabs tabIndex={tabIndex} handleChange={handleChange} />
            <Box sx={{ mt: 2 }}>
              {loading ? (
                <CircularProgress />
              ) : (
                <RequestList items={requestMap[tabIndex] || []} />
              )}
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
