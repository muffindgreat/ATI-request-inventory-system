import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, CardMedia, Chip } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RequestMaterials from "./RequestMaterials";

export default function RequestItem({ item }) {
  const firstMaterial = item.materials[0]?.name || "No materials";
  const moreItems = item.materials.length > 1 ? `+${item.materials.length - 1} more` : "";

  return (
    <Accordion sx={{ my: 1 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {/* Image */}
        {item.materials.length > 0 && (
          <CardMedia component="img" sx={{ width: 40, height: 40, borderRadius: 1 }} image={item.materials[0].image} alt={firstMaterial} />
        )}

        {/* Text & Date */}
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography variant="body1" sx={{ fontWeight: "bold", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {firstMaterial}{" "}
            {moreItems && <Typography component="span" color="textSecondary">({moreItems})</Typography>}
          </Typography>
          {item.requestTime && <Typography variant="caption" color="textSecondary">{item.requestTime}</Typography>}
        </Box>

        {/* Status */}
        <Chip label={item.status} color={item.status === "Pending" ? "warning" : "success"} size="small" sx={{ borderRadius: 2, height: 24 }} />
      </AccordionSummary>

      {/* Expanded Details */}
      <AccordionDetails>
        <Typography variant="body2" color="textSecondary">
          <strong>Acknowledged:</strong> {item.acknowledgedTime || "Not yet acknowledged"}
        </Typography>
        {item.status === "Completed" && (
          <Typography variant="body2" color="textSecondary">
            <strong>Completed:</strong> {item.completedTime}
          </Typography>
        )}

        {/* Materials List */}
        <RequestMaterials materials={item.materials} />
      </AccordionDetails>
    </Accordion>
  );
}
