import { useState } from "react";
import { Container, Box, Card, CardContent } from "@mui/material";
import RequestList from "../../components/MyRequests/RequestList3";
import RequestTabs from "../../components/MyRequests/RequestTabs";
import BackgroundImage from "../../components/UI/BackgroundImage";
import CustomCardHeader from "../../components/UI/CustomCardHeader";
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
          image: "https://www.imagetotext.cc/images/logo.png",
        },
      ],
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
          image: "https://www.imagetotext.cc/images/logo.png",
        },
        {
          name: "Livestock Booklet",
          quantity: 12,
          type: "Booklet",
          bannerPrograms: ["Livestock", "Poultry", "Farm"],
          image: "https://www.imagetotext.cc/images/logo.png",
        },
        {
          name: "Rice Farming Handbook",
          quantity: 18,
          type: "Coffee Table Book",
          bannerPrograms: ["Rice"],
          image: "https://www.imagetotext.cc/images/logo.png",
        },
      ],
    },
  ];

  const pendingRequests = allRequests.filter((req) => req.status === "Pending");
  const completedRequests = allRequests.filter(
    (req) => req.status === "Completed"
  );

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

      <Container
        maxWidth="lg"
        sx={{
          pt: { xs: 12, sm: 14, md: 16 }, // Adjust padding top based on screen size
          mb: 10,
        }}
      >
        <Card elevation={3}>
          <CustomCardHeader
            title="My Requests"
            showBackButton
            backLink="/login"
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
