import { Accordion, AccordionDetails, Typography, Box, Card, CardMedia, Stack, Chip } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";

export default function RequestList({ items }) {
  return (
    <Box sx={{ mt: 2, width: "100%", overflow: "hidden" }}>
      {items.length > 0 ? (
        items.map((item, index) => (
          <Accordion key={index} sx={{ my: 1 }}>
            <AccordionSummary expandIcon={null} sx={{ width: "100%" }}>
              <RequestItemSummary item={item} />
            </AccordionSummary>
            <AccordionDetails>
              {item.materials.length > 1 && <RequestMaterials materials={item.materials.slice(1)} />}
              <RequestDetails item={item} /> {/* ✅ Always show request details */}
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Typography>No Requests Found</Typography>
      )}
    </Box>
  );
}

// ✅ First material now inside a Card to match RequestMaterials
function RequestItemSummary({ item }) {
  const firstMaterial = item.materials[0];

  return (
    <Card sx={{ display: "flex", flexDirection: "column", my: 1, p: 2, width: "100%" }}>
      {/* ✅ Status Chip is now outside materials
      <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 1 }}>
        <Chip
          label={item.status}
          color={item.status === "Pending" ? "warning" : "success"}
          size="small"
          sx={{ borderRadius: 2, height: 24, minWidth: 80 }}
        />
      </Box> */}

      {/* ✅ Materials Section */}
      <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
        {firstMaterial && (
          <CardMedia
            component="img"
            sx={{ width: 64, height: 64, borderRadius: 1, mr: 2 }}
            image={firstMaterial.image}
            alt={firstMaterial.name}
          />
        )}
<Box sx={{ flexGrow: 1 }}>
  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
      {firstMaterial ? firstMaterial.name : "No materials"}
    </Typography>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}> 
      <Typography variant="body2" color="textSecondary">x{firstMaterial.quantity}</Typography>
      <Chip
        label={item.status}
        color={item.status === "Pending" ? "warning" : "success"}
        size="small"
        sx={{ borderRadius: 2, height: 24, minWidth: 80 }}
      />
    </Box>
  </Box>
  <Typography variant="body2" color="textSecondary">{firstMaterial.type}</Typography>
</Box>

      </Box>
    </Card>
  );
}

// ✅ Displays all materials in expanded view except the first one
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

// ✅ Moves request details to expanded view
function RequestDetails({ item }) {
  return (
    <Box sx={{ my: 1 }}>
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
      <Box sx={{ mt: 2, borderBottom: "1px solid #ddd" }} />
    </Box>
  );
}
