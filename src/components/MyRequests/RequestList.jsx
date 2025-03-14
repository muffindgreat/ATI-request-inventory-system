import {
  Accordion,
  AccordionDetails,
  Typography,
  Box,
  Stack,
  Chip,
} from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; // ✅ Import Expand Icon
import { Divider } from "@mui/material";
const formatQuantity = (num) => new Intl.NumberFormat().format(num);

export default function RequestList({ items }) {
  console.log("RequestList Items:", items); // ✅ Debugging output

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

  return (
    <Box sx={{ display: "flex", alignItems: "center", p: 2, width: "100%" }}>
      {/* Material Image */}
      {firstMaterial && (
        <Box
          component="img"
          sx={{ width: 64, height: 64, borderRadius: 1, mr: 2 }}
          src={firstMaterial.image}
          alt={firstMaterial.name}
        />
      )}

      {/* Material Info */}
      <Box sx={{ flexGrow: 1 }}>
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
        <Typography variant="body2" color="textSecondary">
          {firstMaterial.type}
        </Typography>

        {/* Programs (if available) */}
        {firstMaterial.bannerPrograms?.length > 0 && (
          <Stack
            direction="row"
            sx={{
              mt: 1,
              flexWrap: "wrap", // ✅ Allow wrapping on small screens
              gap: 1, // ✅ Consistent spacing between chips
              alignItems: "center", // ✅ Align wrapped items properly
            }}
          >
            {firstMaterial.bannerPrograms.map((program, i) => (
              <Chip
                key={i}
                label={program}
                color="primary"
                size="small"
                sx={{ m: 0 }}
              /> // ✅ Remove extra margins
            ))}
          </Stack>
        )}
      </Box>

      {/* Status & Quantity */}
      <Stack spacing={0.5} alignItems="flex-end">
        <Chip
          label={item.status}
          color={item.status === "Pending" ? "warning" : "success"}
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
          {/* Divider sa pagitan ng bawat item, maliban sa unang item */}
          {index > 0 && <Divider sx={{ my: 1 }} />}

          <Box sx={{ display: "flex", alignItems: "center", my: 1, p: 2 }}>
            <Box
              component="img"
              sx={{ width: 64, height: 64, borderRadius: 1, mr: 2 }}
              src={material.image}
              alt={material.name}
            />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold", mb: 0.5 }}>
                {material.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {material.type}
              </Typography>
              {material.bannerPrograms?.length > 0 && (
                <Stack
                  direction="row"
                  sx={{
                    mt: 1,
                    flexWrap: "wrap", // ✅ Allow wrapping
                    gap: 1, // ✅ Controlled spacing (instead of spacing={1})
                    alignItems: "center", // ✅ Align items properly
                  }}
                >
                  {material.bannerPrograms.map((program, i) => (
                    <Chip
                      key={i}
                      label={program}
                      color="primary"
                      size="small"
                      sx={{ m: 0 }}
                    /> // ✅ Remove extra margins
                  ))}
                </Stack>
              )}
            </Box>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{
                fontWeight: "bold",
                px: 1,
                borderRadius: 1,
              }}
            >
              Qty: {formatQuantity(material.quantity)}
            </Typography>
          </Box>
        </Box>
      ))}
    </>
  );
}

function RequestDetails({ item }) {
  return (
    <Box sx={{ my: 1 }}>
      <Divider sx={{ my: 1 }} />
      <Typography variant="body2" color="textSecondary">
        <strong>Requested:</strong> {item.requestedTime || "No date available"}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        <strong>Acknowledged:</strong>{" "}
        {item.acknowledgedTime || "Not yet acknowledged"}
      </Typography>
      {item.status === "Completed" && (
        <Typography variant="body2" color="textSecondary">
          <strong>Completed:</strong> {item.completedTime}
        </Typography>
      )}
      {/* Add Purpose, Date Needed, and Program */}
      <Typography variant="body2" color="textSecondary">
        <strong>Purpose:</strong> {item.purpose || "No purpose provided"}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        <strong>Date Needed:</strong> {item.dateNeeded || "No date specified"}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        <strong>Program:</strong> {item.program || "No program specified"}
      </Typography>

      <Box sx={{ mt: 2, borderBottom: "1px solid #ddd" }} />
    </Box>
  );
}
