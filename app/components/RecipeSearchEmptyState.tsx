import { Box, Typography, useTheme } from "@mui/material";
import { GiForkKnifeSpoon } from "react-icons/gi";

export default function RecipeSearchEmptyState() {
  const { palette } = useTheme()
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        textAlign: "center",
        justifyContent: "center",
        flexDirection: "column",
        mb: "30px"
      }}
    >
      <Box sx={{ mb: "10px" }}>
        <Typography variant="h6">No recipes found</Typography>
      </Box>
      <Box sx={{height: "180px", width: "180px", border: "2px solid black", borderRadius: "50%", margin: "0 auto", display: "flex"}}>
        <Box sx={{height: "140px", width: "140px", padding: "15px", border: "1px solid black", borderRadius: "50%", margin: "auto"}}>
        <GiForkKnifeSpoon aria-hidden="true" style={{height: "100%", width: "100%"}} color={palette.primary.main}/>
        </Box>
      </Box>
      <Box sx={{ mt: "10px" }}>
        <Typography variant="body1">
          Please adjust your ingredient list and try again
        </Typography>
      </Box>
    </Box>
  );
}
