import { Box, Typography } from "@mui/material";
import { IRecipe } from "../utils/interfaces";

export default function RecipeListPanel({
  fetchedRecipes,
}: {
  fetchedRecipes: IRecipe[];
}) {
  return (
    <>
      {fetchedRecipes.map((recipe) => {
        return (
          <Box key={recipe.title}>
            <Typography variant="body1">{recipe.title}</Typography>
          </Box>
        );
      })}
    </>
  );
}
