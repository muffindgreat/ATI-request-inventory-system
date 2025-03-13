import { useState } from "react";
import { Container, Tabs, Tab, Box, Card, CardHeader, CardContent } from "@mui/material";
import RequestList from "../../components/MyRequests/RequestList3";
import RequestTabs from "../../components/MyRequests/RequestTabs";
import BackgroundImage from "../../components/UI/BackgroundImage";
import bgImage from "/image.png";

export default function MyRequests() {
  const [tabIndex, setTabIndex] = useState(0);

  const allRequests = [
    {
      status: "Pending",
      requestedTime: "March 10, 2025, 08:30 AM",
      acknowledgedTime: "March 10, 2025, 10:15 AM",
      completedTime: null,
      materials: [
        { 
          name: "Fisheries Guide Book", 
          quantity: 10, 
          type: "Book", 
          bannerPrograms: ["Livestock", "Poultry", "Agriculture"], 
          image: "https://via.placeholder.com/64" 
        }
      ]
    },
    {
      status: "Completed",
      requestedTime: "March 8, 2025, 09:00 AM",
      acknowledgedTime: "March 8, 2025, 11:30 AM",
      completedTime: "March 9, 2025, 02:00 PM",
      materials: [
        { 
          name: "Corn Farming Manual", 
          quantity: 7, 
          type: "Manual", 
          bannerPrograms: ["Corn"], 
          image: "https://via.placeholder.com/64" 
        },
        { 
          name: "Livestock Booklet", 
          quantity: 12, 
          type: "Booklet", 
          bannerPrograms: ["Livestock", "Poultry", "Farm"], 
          image: "https://via.placeholder.com/64" 
        },
        { 
          name: "Rice Farming Handbook", 
          quantity: 18, 
          type: "Coffee Table Book", 
          bannerPrograms: ["Rice"], 
          image: "https://via.placeholder.com/64" 
        }
      ]
    }
  ];
  
  const pendingRequests = allRequests.filter((req) => req.status === "Pending");
  const completedRequests = allRequests.filter((req) => req.status === "Completed");

  const handleChange = (event, newIndex) => {
    setTabIndex(newIndex);
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

    <BackgroundImage imageUrl={bgImage} />

    <Container maxWidth="lg" sx={{ mt: 10, mb: 10 }}>
      <Card elevation={3}>
        <CardHeader 
          title="My Requests" 
          sx={{ backgroundColor: "#1A854B", color: "white", textAlign: "center" }} 
        />
        <CardContent>
        <RequestTabs tabIndex={tabIndex} handleChange={handleChange} />
          <Box sx={{ mt: 2 }}>
            {tabIndex === 0 && <RequestList items={allRequests} />}
            {tabIndex === 1 && <RequestList items={pendingRequests} />}
            {tabIndex === 2 && <RequestList items={completedRequests} />}
          </Box>
        </CardContent>
      </Card>
    </Container>
    </Box>
  );
}
