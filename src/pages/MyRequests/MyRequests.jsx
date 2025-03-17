import { useState } from "react";
import { Container, Box, Card, CardContent } from "@mui/material";
import RequestList from "../../components/MyRequests/RequestList";
import RequestTabs from "../../components/MyRequests/RequestTabs";
import BackgroundImage from "../../components/UI/BackgroundImage";
import CustomCardHeader from "../../components/UI/CustomCardHeader";
import { allRequests } from "../../components/UI/sample_data";

export default function MyRequests() {
  const [tabIndex, setTabIndex] = useState(0);

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
      <BackgroundImage />

      <Container
        maxWidth="lg"
        sx={{
          pt: { xs: 12, sm: 14, md: 16 }, // Adjust padding top based on screen size
          mb: 10,
        }}
      >
        <Card elevation={3}>
          <CustomCardHeader title="My Requests" showBackButton />
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
