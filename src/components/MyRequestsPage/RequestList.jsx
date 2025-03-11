import { Accordion, AccordionSummary, AccordionDetails, Card, Typography, Box, CardMedia, Chip, Stack } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function RequestList({ items }) {
  return (
    <Box>
      {items.length > 0 ? (
        items.map((item, index) => {
          const firstMaterial = item.materials[0]?.name || "No materials";
          const moreItems = item.materials.length > 1 ? `+${item.materials.length - 1} more` : "";

          return (
            <Accordion key={index} sx={{ my: 1 }}>
<AccordionSummary 
  expandIcon={<ExpandMoreIcon />} 
  sx={{ 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "space-between",  // Keeps the badge aligned
    gap: 1, 
    flexWrap: "nowrap",  // 🚀 Prevents the badge from moving down
    overflow: "hidden",
    minWidth: 0
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
        flexShrink: 0 
      }}
      image={item.materials[0].image}
      alt={item.materials[0].name}
    />
  )}

  {/* Text & Date (Flexible Box) */}
  <Box 
    sx={{ 
      flexGrow: 1, 
      minWidth: 0, 
      overflow: "hidden", 
      display: "flex", 
      flexDirection: "column",  
      justifyContent: "center"
    }}
  >
    {/* Name */}
    <Typography 
      variant="body1" 
      sx={{ 
        fontWeight: "bold", 
        whiteSpace: "nowrap",  // 🚀 Prevents text from breaking into multiple lines
        overflow: "hidden", 
        textOverflow: "ellipsis",
        maxWidth: "100%"
      }}
    >
      {firstMaterial}{" "}
      {moreItems && <Typography component="span" color="textSecondary">({moreItems})</Typography>}
    </Typography>

    {/* Date & Time */}
    {item.requestTime && (
      <Typography 
        variant="caption" 
        color="textSecondary" 
        sx={{ 
          whiteSpace: "nowrap", 
          overflow: "hidden", 
          textOverflow: "ellipsis", 
          display: "block",
          maxWidth: "100%"
        }}
      >
        {item.requestTime}
      </Typography>
    )}
  </Box>

  {/* Status (Fixed to Right) */}
  <Box 
    sx={{ 
      flexShrink: 0, 
      minWidth: "fit-content", 
      display: "flex", 
      alignItems: "center"
    }}
  >
    <Chip 
      label={item.status} 
      color={item.status === "Pending" ? "warning" : "success"} 
      size="small" 
      sx={{
        borderRadius: 2,
        height: 24,
        minWidth: 60, 
        justifyContent: "center",
        whiteSpace: "nowrap"
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
        <Typography>No requests found.</Typography>
      )}
    </Box>
  );
}
