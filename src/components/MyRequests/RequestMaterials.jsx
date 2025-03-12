import { Box } from "@mui/material";
import MaterialItem from "./MaterialItem";

export default function RequestMaterials({ materials }) {
  return (
    <Box sx={{ mt: 2, mb: 1 }}>
      {materials.map((material, index) => (
        <MaterialItem key={index} material={material} />
      ))}
    </Box>
  );
}
