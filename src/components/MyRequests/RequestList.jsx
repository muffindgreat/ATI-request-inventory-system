import {
  Accordion,
  AccordionDetails,
  Typography,
  Box,
  Stack,
  Chip,
  Divider,
} from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; // ✅ Import Expand Icon
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DoneIcon from "@mui/icons-material/Done";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";

const formatQuantity = (num) => new Intl.NumberFormat().format(num);

export default function RequestList({ items }) {
  return (
    <Box sx={{ mt: 2, width: "100%", overflow: "hidden" }}>
      {items.length > 0 ? (
        items.map((item, index) => (
          <Accordion key={index} sx={{ my: 1, borderRadius: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ width: "100%" }}
            >
              <RequestItemSummary item={item} />
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: "#f9f9f9", borderRadius: 2 }}>
              {item.materials.length > 1 && (
                <RequestMaterials materials={item.materials.slice(1)} />
              )}
              <RequestDetails item={item} />
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Typography sx={{ textAlign: "center", mt: 3, color: "gray" }}>
          No requests found
        </Typography>
      )}
    </Box>
  );
}

function RequestItemSummary({ item }) {
  const firstMaterial = item.materials[0];
  const additionalCount = item.materials.length - 1; // Calculate additional items

  console.log("firstMaterial", firstMaterial);
  return (
    <Box sx={{ display: "flex", alignItems: "center", p: 2, width: "100%" }}>
      {/* Material Image */}
      {firstMaterial && (
        <Box
          component="img"
          sx={{
            borderRadius: 1,
            mr: 1,
            width: 60,
            height: 90,
            minWidth: 60,
            minHeight: 90,
            borderRadius: 1,
            flexShrink: 0,
            objectFit: "cover",
          }}
          src={firstMaterial.imageUrl} // ✅ Fix: Use imageUrl instead of image
          alt={firstMaterial.name}
        />
      )}

      {/* Material Info */}
      <Box sx={{ flexGrow: 1, ml: 1 }}>
        <Box>
          <Typography
            component={Link}
            to={`/item-info/${firstMaterial?.id}`}
            variant="body1"
            sx={{
              fontWeight: "bold",
              mb: 0.5,
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden", // Truncate after 2 lines
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {firstMaterial ? firstMaterial.name : "No materials"}
          </Typography>

          {additionalCount > 0 && (
            <Typography
              component="span"
              sx={{
                color: "gray",
                fontSize: 14,
                display: "block",
                "@media (min-width:600px)": {
                  display: "inline",
                  ml: 1,
                },
              }}
            >
              (+{additionalCount} more)
            </Typography>
          )}
        </Box>
        <Typography variant="body2" color="textSecondary">
          {firstMaterial.type}
        </Typography>

        {/* Programs (if available) */}
        {firstMaterial.bannerProgram?.length > 0 && (
          <Stack
            direction="row"
            sx={{
              mt: 1,
              flexWrap: "wrap",
              gap: 1,
              alignItems: "center",
            }}
          >
            {firstMaterial.bannerProgram.map((program, i) => (
              <Tooltip key={i} title={program}>
                <Chip
                  label={program}
                  color="primary"
                  size="small"
                  sx={{
                    maxWidth: {
                      xs: 90, // ellipsis on small screens
                      sm: "none", // full width on medium and up
                    },
                    textOverflow: {
                      xs: "ellipsis",
                      sm: "initial",
                    },
                    overflow: {
                      xs: "hidden",
                      sm: "visible",
                    },
                    whiteSpace: {
                      xs: "nowrap",
                      sm: "normal",
                    },
                  }}
                />
              </Tooltip>
            ))}
          </Stack>
        )}
      </Box>

      {/* Status & Quantity */}
      <Stack spacing={0.5} alignItems="flex-end">
        <Chip
          label={getStatusLabel(item.status)}
          color={getStatusColor(item.status)}
          size="small"
          sx={{ borderRadius: 2, height: 24, minWidth: 80 }}
        />
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ fontWeight: "bold" }}
        >
          Qty: {formatQuantity(firstMaterial.quantity)}
        </Typography>
      </Stack>
    </Box>
  );
}

function RequestMaterials({ materials }) {
  return (
    <>
      {materials.map((material, index) => (
        <Box key={index}>
          {index > 0 && <Divider sx={{ my: 1 }} />}

          <Box sx={{ display: "flex", alignItems: "center", my: 1, p: 2 }}>
            <Box
              component="img"
              sx={{
                borderRadius: 1,
                mr: 2,
                width: 60,
                height: 90,
                minWidth: 60,
                minHeight: 90,
                borderRadius: 1,
                flexShrink: 0,
                objectFit: "cover",
              }}
              src={material.imageUrl} // ✅ Fix: Use imageUrl
              alt={material.name}
            />
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                component={Link}
                to={`/item-info/${material.id}`}
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  mb: 0.5,
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                {material.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {material.type}
              </Typography>
              {material.bannerProgram?.length > 0 && ( // ✅ Fix: Use bannerProgram (not bannerPrograms)
                <Stack
                  direction="row"
                  sx={{
                    mt: 1,
                    flexWrap: "wrap",
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  {material.bannerProgram.map((program, i) => (
                    <Tooltip key={i} title={program}>
                      <Chip
                        label={program}
                        color="primary"
                        size="small"
                        sx={{
                          maxWidth: {
                            xs: 90, // ellipsis on small screens
                            sm: "none", // full width on medium and up
                          },
                          textOverflow: {
                            xs: "ellipsis",
                            sm: "initial",
                          },
                          overflow: {
                            xs: "hidden",
                            sm: "visible",
                          },
                          whiteSpace: {
                            xs: "nowrap",
                            sm: "normal",
                          },
                        }}
                      />
                    </Tooltip>
                  ))}
                </Stack>
              )}
            </Box>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ fontWeight: "bold", px: 1, borderRadius: 1 }}
            >
              Qty: {formatQuantity(material.quantity)}
            </Typography>
          </Box>
        </Box>
      ))}
    </>
  );
}

function getStatusLabel(status) {
  return status === "Received" ? "Completed" : status;
}

function getStatusColor(status) {
  switch (status) {
    case "Pending":
      return "warning";
    case "Accepted":
    case "Approved":
      return "info";
    case "Completed":
    case "Received":
      return "success";
    default:
      return "default";
  }
}

function formatDate(dateString) {
  const date = new Date(dateString); // Parse the string into a Date object
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short", // "Mon", "Tue", etc.
    year: "numeric", // 2025
    month: "short", // "Apr"
    day: "numeric", // 18
  }).format(date);
}
function RequestDetails({ item }) {
  const statusStages = [
    {
      key: "date",
      label: "Requested",
      icon: <AccessTimeIcon sx={{ fontSize: 18, mr: 1 }} />,
    },
    {
      key: "acceptedDate",
      label: "Accepted",
      icon: <HourglassEmptyIcon sx={{ fontSize: 18, mr: 1 }} />,
      show: item.status !== "Pending",
    },
    {
      key: "approvedDate",
      label: "Approved",
      icon: <CheckCircleIcon sx={{ fontSize: 18, mr: 1 }} />,
      show: ["Approved", "Completed", "Received"].includes(item.status),
    },
    {
      key: "receivedDate",
      label: "Received",
      icon: <DoneIcon sx={{ fontSize: 18, mr: 1 }} />,
      show: item.status === "Received",
    },
  ];

  return (
    <Box sx={{ my: 2, p: 2, border: "1px solid #ddd", borderRadius: 2 }}>
      <Stack spacing={1}>
        {statusStages.map(({ key, label, icon, show }) =>
          show !== false ? (
            <Typography key={key} variant="body2" color="textSecondary">
              {icon} <strong>{label}:</strong> {item[key] || "Not yet recorded"}
            </Typography>
          ) : null
        )}
      </Stack>
      <Divider sx={{ my: 2 }} />
      <Typography variant="body2">
        <strong>Purpose:</strong> {item.purpose || "No purpose provided"}
      </Typography>
      <Typography variant="body2">
        <strong>Date Needed:</strong>{" "}
        {item.dateNeeded ? formatDate(item.dateNeeded) : "Not specified"}
      </Typography>
      <Typography variant="body2">
        <strong>Program:</strong> {item.program || "Not specified"}
      </Typography>
    </Box>
  );
}
