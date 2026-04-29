"use client";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import IngredientSearch from "./components/IngredientSearch";
import { IIngredient, IRecipe } from "./utils/interfaces";
import { useEffect, useState } from "react";
import useSpoonacular from "./hooks/useSpoonacular";
import { AxiosResponse } from "axios";
import RecipeListPanel from "./components/RecipeListPanel";

export default function Home() {
  const [componentMounted, setComponentMounted] = useState(false);

  const tagline =
    "Tell us what's in your fridge. We'll tell you what's cooking.";

  const [selectedIngredients, setSelectedIngredients] = useState<IIngredient[]>(
    [],
  );

  const [count, setCount] = useState<number>(5);
  const [fetchedRecipes, setFetchedRecipes] = useState<IRecipe[]>([]);
  const spoonacularInstance = useSpoonacular();

  const fetchRecipes = () => {
    const queryString = selectedIngredients
      .map((ingredient) => ingredient.name)
      .join(",+");

    spoonacularInstance
      .get(
        `/recipes/findByIngredients?ingredients=${queryString}&number=${count}&ranking=1`,
      )
      .then((res: AxiosResponse<IRecipe[]>) => {
        setFetchedRecipes(res.data);
      });
  };

  useEffect(() => {
    // We are guaranteeing only one render because of the empty dependencies array, so disabling this
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setComponentMounted(true);
  }, []);

  return (
    <>
      {componentMounted && (
        <Box>
          <Box className="title-container">
            <Typography variant="h5">Plate My Pantry</Typography>
            <Typography variant="body1">{tagline}</Typography>
          </Box>
          <Box>
            <Typography variant="body1">Add your ingredients</Typography>
            <Box sx={{ display: "flex", gap: "10px" }}>
              <IngredientSearch
                sx={{ width: "300px" }}
                selectedIngredients={selectedIngredients}
                setSelectedIngredients={setSelectedIngredients}
              />
              <FormControl sx={{ width: "100px" }}>
                <InputLabel id="">Count</InputLabel>
                <Select
                  defaultValue={5}
                  value={count}
                  onChange={(e) => {
                    setCount(e.target.value as number);
                  }}
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={15}>15</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Button
              disabled={selectedIngredients.length === 0}
              onClick={() => {
                fetchRecipes();
              }}
            >
              Find a recipe!
            </Button>
          </Box>
          <Box>
            <RecipeListPanel fetchedRecipes={fetchedRecipes} />
          </Box>
        </Box>
      )}
    </>
  );
}
