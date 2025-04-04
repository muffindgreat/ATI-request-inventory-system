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
          No Requests Found
        </Typography>
      )}
    </Box>
  );
}

function RequestItemSummary({ item }) {
  const firstMaterial = item.materials[0];
  const additionalCount = item.materials.length - 1; // Calculate additional items

  return (
    <Box sx={{ display: "flex", alignItems: "center", p: 2, width: "100%" }}>
      {/* Material Image */}
      {firstMaterial && (
        <Box
          component="img"
          sx={{ width: 64, height: 64, borderRadius: 1, mr: 2 }}
          src={firstMaterial.imageUrl} // ✅ Fix: Use imageUrl instead of image
          alt={firstMaterial.name}
        />
      )}

      {/* Material Info */}
      <Box sx={{ flexGrow: 1 }}>
        <Box>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              mb: 0.5,
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden", // Truncate after 2 lines
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
        {firstMaterial.bannerProgram?.length > 0 && ( // ✅ Fix: Use bannerProgram (not bannerPrograms)
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
              <Chip key={i} label={program} color="primary" size="small" sx={{ m: 0 }} />
            ))}
          </Stack>
        )}
      </Box>

      {/* Status & Quantity */}
      <Stack spacing={0.5} alignItems="flex-end">
        <Chip
          label={item.status}
          color={getStatusColor(item.status)}
          size="small"
          sx={{ borderRadius: 2, height: 24, minWidth: 80 }}
        />
        <Typography variant="body2" color="textSecondary" sx={{ fontWeight: "bold" }}>
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
              sx={{ width: 64, height: 64, borderRadius: 1, mr: 2 }}
              src={material.imageUrl} // ✅ Fix: Use imageUrl
              alt={material.name}
            />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold", mb: 0.5 }}>
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
                    <Chip key={i} label={program} color="primary" size="small" sx={{ m: 0 }} />
                  ))}
                </Stack>
              )}
            </Box>
            <Typography variant="body2" color="textSecondary" sx={{ fontWeight: "bold", px: 1, borderRadius: 1 }}>
              Qty: {formatQuantity(material.quantity)}
            </Typography>
          </Box>
        </Box>
      ))}
    </>
  );
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
        <strong>Date Needed:</strong> {item.dateNeeded || "Not specified"}
      </Typography>
      <Typography variant="body2">
        <strong>Program:</strong> {item.program || "Not specified"}
      </Typography>
    </Box>
  );
}
