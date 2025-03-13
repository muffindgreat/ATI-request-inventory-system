import { Box, CardMedia, Typography, Chip } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionSummary from "@mui/material/AccordionSummary";

export default function RequestItemSummary({ item }) {
  const firstMaterial = item.materials[0]?.name || "No materials";
  const moreItems = item.materials.length > 1 ? `+${item.materials.length - 1} more` : "";

  return (
    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          gap: 2,
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {/* Left Section: Image + Title + (+ more) */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flex: 1,
            minWidth: 0,
            gap: 2,
          }}
        >
          {item.materials.length > 0 && (
            <CardMedia
              component="img"
              sx={{ width: 40, height: 40, borderRadius: 1, flexShrink: 0 }}
              image={item.materials[0].image}
              alt={item.materials[0].name}
            />
          )}

          <Box sx={{ flexGrow: 1, minWidth: 0, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 0.5 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
            >
              {firstMaterial}
            </Typography>

            {moreItems && (
              <Typography component="span" color="textSecondary" sx={{ whiteSpace: "nowrap" }}>
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
            flexShrink: 0,
            marginRight: 1,
          }}
        />
      </Box>
    </AccordionSummary>
  );
}
