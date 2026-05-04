import { Box, IconButton, Typography } from "@mui/material";
import { ISlimRecipe } from "../utils/interfaces";
import { Dispatch, SetStateAction } from "react";
import Grid from "@mui/material/Grid";
import { FaArrowAltCircleRight } from "react-icons/fa";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function RecipeCard({
  recipe,
  onClick,
}: {
  recipe: ISlimRecipe;
  onClick: Dispatch<SetStateAction<boolean>>;
}) {
  const isMobile = useMediaQuery("(max-width:600px)");

  if (isMobile) {
    return (
      <Box
        onClick={() => onClick(true)}
        sx={{
          position: "relative",
          borderRadius: "10px",
          my: "10px",
          height: "140px",
          overflow: "hidden",
          cursor: "pointer",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
          },
        }}
      >
        <Box
          component="img"
          src={recipe.image}
          alt={recipe.title + "-image"}
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 100%)",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            padding: "12px",
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 600, color: "white" }}>
            {recipe.title}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        border: "1px solid gray",
        borderRadius: "10px",
        my: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        py: "20px",
        px: "15px",
        height: "140px",
        cursor: "pointer",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateX(4px)",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
        },
      }}
      onClick={() => onClick(true)}
    >
      <Grid container spacing={2} sx={{ display: "flex", width: "100%" }}>
        <Grid size={4} sx={{ display: "flex", justifyContent: "left" }}>
          <img
            style={{
              borderRadius: "15px",
              height: "100px",
              width: "100%",
              objectFit: "cover",
            }}
            alt={recipe.title + "-image"}
            src={recipe.image}
          />
        </Grid>
        <Grid size={6.5}>
          <Typography variant="h6">{recipe.title}</Typography>
        </Grid>
        <Grid size={0.5}>
          <Box>
            <IconButton sx={{ padding: "0px" }} size="large" color="secondary">
              <FaArrowAltCircleRight />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}