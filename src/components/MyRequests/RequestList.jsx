import { Accordion, AccordionDetails, Typography, Box, Card, CardMedia, Stack, Chip } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionSummary from "@mui/material/AccordionSummary";

export default function RequestList({ items }) {
  return (
    <Box sx={{ mt: 2, width: "100%", overflow: "hidden" }}>
      {items.length > 0 ? (
        items.map((item, index) => (
          <Accordion key={index} sx={{ my: 1 }}>
            <RequestItemSummary item={item} />
            <AccordionDetails>
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
              <Box sx={{ mt: 2, mb: 1, borderBottom: "1px solid #ddd" }} />
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

function RequestItemSummary({ item }) {
  const firstMaterial = item.materials[0]?.name || "No materials";
  const moreItems = item.materials.length > 1 ? `+${item.materials.length - 1} more` : "";

  return (
    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", alignItems: "center", width: "100%", gap: 2, flexWrap: "wrap", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", flex: 1, minWidth: 0, gap: 2 }}>
          {item.materials.length > 0 && (
            <CardMedia component="img" sx={{ width: 40, height: 40, borderRadius: 1, flexShrink: 0 }} image={item.materials[0].image} alt={item.materials[0].name} />
          )}
          <Box sx={{ flexGrow: 1, minWidth: 0, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 0.5 }}>
            <Typography variant="body1" sx={{ fontWeight: "bold", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {firstMaterial}
            </Typography>
            {moreItems && (
              <Typography component="span" color="textSecondary" sx={{ whiteSpace: "nowrap" }}>
                ({moreItems})
              </Typography>
            )}
          </Box>
        </Box>
        <Chip
          label={item.status}
          color={item.status === "Pending" ? "warning" : "success"}
          size="small"
          sx={{ borderRadius: 2, height: 24, minWidth: 80, justifyContent: "center", whiteSpace: "nowrap", flexShrink: 0, marginRight: 1 }}
        />
      </Box>
    </AccordionSummary>
  );
}

function RequestMaterials({ materials }) {
  return (
    <>
      {materials.map((material, index) => (
        <Card key={index} sx={{ display: "flex", alignItems: "center", my: 1, p: 2 }}>
          <CardMedia component="img" sx={{ width: 64, height: 64, borderRadius: 1, mr: 2 }} image={material.image} alt={material.name} />
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {material.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                x{material.quantity}
              </Typography>
            </Box>
            <Typography variant="body2" color="textSecondary">{material.type}</Typography>
            {material.bannerPrograms?.length > 0 && (
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                {material.bannerPrograms.map((program, i) => (
                  <Chip key={i} label={program} color="primary" size="small" />
                ))}
              </Stack>
            )}
          </Box>
        </Card>
      ))}
    </>
  );
}
