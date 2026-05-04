import { Box, Card, CardContent, Typography } from "@mui/material";
import { ISlimRecipe } from "../utils/interfaces";
import Image from "next/image";

export default function IngredientCard({ recipe }: { recipe: ISlimRecipe }) {
  return (
    <>
      <Card sx={{ height: "100px", border: "1px solid black", my: "10px" }}>
        <CardContent>
          <Box sx={{ display: "flex"}}>
            <img width={100} alt={recipe.title + "-image"} src={recipe.image} />
            <Typography variant="body1">{recipe.title}</Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
