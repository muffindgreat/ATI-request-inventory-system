import { Box, Card, CardMedia, Typography, Stack, Chip } from "@mui/material";

export default function RequestMaterials({ materials }) {
  return (
    <>
      {materials.map((material, index) => (
        <Card key={index} sx={{ display: "flex", alignItems: "center", my: 1, p: 2 }}>
          {/* Image */}
          <CardMedia component="img" sx={{ width: 64, height: 64, borderRadius: 1, mr: 2 }} image={material.image} alt={material.name} />

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
            <Typography variant="body2" color="textSecondary">{material.type}</Typography>

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
    </>
  );
}
