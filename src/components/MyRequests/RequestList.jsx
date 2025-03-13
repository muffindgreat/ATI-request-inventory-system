import { Accordion, AccordionDetails, Typography, Box } from "@mui/material";
import RequestMaterials from "./RequestMaterials";
import RequestItemSummary from "./RequestItemSummary"; // ✅ Import new component

export default function RequestList({ items }) {
  return (
    <Box sx={{ mt: 2, width: "100%", overflow: "hidden" }}>
      {items.length > 0 ? (
        items.map((item, index) => (
          <Accordion key={index} sx={{ my: 1 }}>
            {/* ✅ Use new component for AccordionSummary */}
            <RequestItemSummary item={item} />

            <AccordionDetails>
              {/* Request Details */}
              <Typography variant="body2" color="textSecondary">
                <strong>Requested:</strong> {item.requestedTime || "No date available"}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Acknowledged:</strong> {item.acknowledgedTime || "Not yet acknowledged"}
              </Typography>
              {item.status === "Completed" && (
                <Typography variant="body2" color="textSecondary">
                  <strong>Completed:</strong> {item.completedTime}
                </Typography>
              )}

              {/* Divider */}
              <Box sx={{ mt: 2, mb: 1, borderBottom: "1px solid #ddd" }} />

              {/* ✅ New Component for Materials List */}
              <RequestMaterials materials={item.materials} />
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Typography>No Requests Found</Typography>
      )}
    </Box>
  );
}
