import { useState } from "react";
import { Container, Tabs, Tab, Box, Card, CardHeader, CardContent } from "@mui/material";
import RequestList from "./RequestList";

export default function MyRequests() {
  const [tabIndex, setTabIndex] = useState(0);

  const allRequests = [
    {
      status: "Pending",
      requestTime: "March 10, 2025, 08:30 AM",
      acknowledgedTime: "March 10, 2025, 10:15 AM",
      completedTime: null, // Pending, so no completed time
      materials: [
        { 
          name: "Fisheries Guide Book", 
          quantity: 10, 
          type: "Book", 
          bannerPrograms: ["Fisheries"], 
          image: "https://via.placeholder.com/64" 
        },
        { 
          name: "Rice & Corn Flyer", 
          quantity: 5, 
          type: "Flyer", 
          bannerPrograms: ["Rice", "Corn"], 
          image: "https://via.placeholder.com/64" 
        }
      ]
    },
    {
      status: "Completed",
      requestTime: "March 8, 2025, 09:00 AM",
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
          bannerPrograms: ["Livestock", "Poultry"], 
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
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card elevation={3}>
        <CardHeader 
          title="My Requests" 
          sx={{ backgroundColor: "#1A854B", color: "white", textAlign: "center" }} 
        />
        <CardContent>
          <Tabs 
            value={tabIndex} 
            onChange={handleChange} 
            textColor="inherit"
            indicatorColor="primary"
            variant="fullWidth"
            sx={{
              ".MuiTabs-indicator": { backgroundColor: "#1A854B" },
              ".MuiTab-root": { backgroundColor: "white", color: "#1A854B" },
              ".Mui-selected": { backgroundColor: "#78B99E", color: "#1A854B" }
            }}
          >
            <Tab label="All" />
            <Tab label="Pending" />
            <Tab label="Completed" />
          </Tabs>
          <Box sx={{ mt: 2 }}>
            {tabIndex === 0 && <RequestList items={allRequests} />}
            {tabIndex === 1 && <RequestList items={pendingRequests} />}
            {tabIndex === 2 && <RequestList items={completedRequests} />}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
