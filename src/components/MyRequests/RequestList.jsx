import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, CardMedia, Chip, Stack, Card } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function RequestList({ items }) {
  return (
    <Box sx={{ mt: 2, width: "100%", overflow: "hidden" }}>
      {items.length > 0 ? (
        items.map((item, index) => {
          const firstMaterial = item.materials[0]?.name || "No materials";
          const moreItems = item.materials.length > 1 ? `+${item.materials.length - 1} more` : "";

          return (
            <Accordion key={index} sx={{ my: 1 }}>
<AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ width: "100%" }}>
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      width: "100%",
      gap: 2,
      flexWrap: "wrap", // ✅ Wraps content when needed
      justifyContent: "space-between",
    }}
  >
    {/* Left Section: Image + Title + (+ more) */}
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flex: 1, // ✅ Allows expansion
        minWidth: 0, // ✅ Prevents text overflow issues
        gap: 2,
      }}
    >
      {/* Image */}
      {item.materials.length > 0 && (
        <CardMedia
          component="img"
          sx={{
            width: 40,
            height: 40,
            borderRadius: 1,
            flexShrink: 0,
          }}
          image={item.materials[0].image}
          alt={item.materials[0].name}
        />
      )}

      {/* Title + (+ more) wrapped in one container */}
      <Box
        sx={{
          flexGrow: 1,
          minWidth: 0, // ✅ Prevents text overflow issues
          display: "flex",
          flexWrap: "wrap", // ✅ Ensures (+ more) does not collide with chip
          alignItems: "center",
          gap: 0.5,
        }}
      >
        {/* Name */}
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {firstMaterial}
        </Typography>

        {/* (+ more) should stay close to the title */}
        {moreItems && (
          <Typography
            component="span"
            color="textSecondary"
            sx={{ whiteSpace: "nowrap" }}
          >
            ({moreItems})
          </Typography>
        )}
      </Box>
    </Box>

    {/* Right Section: Status Chip */}
    <Chip
      label={item.status}
      color={item.status === "Pending" ? "warning" : "success"}
      size="small"
      sx={{
        borderRadius: 2,
        height: 24,
        minWidth: 80,
        justifyContent: "center",
        whiteSpace: "nowrap",
        flexShrink: 0, // ✅ Prevents resizing issues
      }}
    />
  </Box>
</AccordionSummary>

              <AccordionDetails>
                {/* Request Details */}
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

                {/* Materials List */}
                {item.materials.map((material, matIndex) => (
                  <Card key={matIndex} sx={{ display: "flex", alignItems: "center", my: 1, p: 2 }}>
                    {/* Image */}
                    <CardMedia
                      component="img"
                      sx={{ width: 64, height: 64, borderRadius: 1, mr: 2 }}
                      image={material.image}
                      alt={material.name}
                    />

                    <Box sx={{ flexGrow: 1 }}>
                      {/* Name & Quantity in One Row */}
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                          {material.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          x{material.quantity}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="textSecondary">
                                        {material.type}
                                      </Typography>
                      {/* Banner Programs */}
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
              </AccordionDetails>
            </Accordion>
          );
        })
      ) : (
        <Typography>No Requests Found</Typography>
      )}
    </Box>
  );
}
