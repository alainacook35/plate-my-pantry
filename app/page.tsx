"use client";
import { Box, Button, Pagination, Typography } from "@mui/material";
import IngredientSearch from "./components/IngredientSearch";
import { IIngredient, IRecipeSearchResponse } from "./utils/interfaces";
import { useCallback, useEffect, useState } from "react";
import useSpoonacular from "./hooks/useSpoonacular";
import { AxiosResponse } from "axios";
import IngredientCard from "./components/IngredientCard";

export default function Home() {
  const [componentMounted, setComponentMounted] = useState(false);

  const tagline =
    "Tell us what's in your fridge. We'll tell you what's cooking.";

  const [selectedIngredients, setSelectedIngredients] = useState<IIngredient[]>(
    [],
  );

  const [recipeResponse, setRecipeResponse] =
    useState<IRecipeSearchResponse | null>(null);
  const spoonacularInstance = useSpoonacular();

  const fetchRecipes = useCallback(
    (offset: number) => {
      const queryString = selectedIngredients
        .map((ingredient) => ingredient.name)
        .join(",");

      spoonacularInstance
        .get(
          `/recipes/complexSearch?includeIngredients=${queryString}&number=10&offset=${(offset - 1) * 10}`,
        )
        .then((res: AxiosResponse<IRecipeSearchResponse>) => {
          setRecipeResponse(res.data);
        });
    },
    [selectedIngredients, spoonacularInstance],
  );

  useEffect(() => {
    // Find a recipe button disabled is being calculated based selectedIngredients, which does not exist yet
    // during SSR, so adding a flag for component mounted

    // We are guaranteeing only one render because of the empty dependencies array, so disabling this warning
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setComponentMounted(true);
  }, []);

  return (
    <>
      {componentMounted && (
        <Box
          sx={(theme) => ({
            background: theme.palette.background.paper,
            width: "70%",
            display: "flex",
            margin: "auto",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px"
          })}
        >
          <Box className="title-container" sx={{ textAlign: "center" }}>
            <Typography variant="h5">Plate My Pantry</Typography>
            <Typography variant="body1">{tagline}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <Typography variant="body1">Add your ingredients</Typography>
            <IngredientSearch
              sx={{ width: "300px" }}
              selectedIngredients={selectedIngredients}
              setSelectedIngredients={setSelectedIngredients}
            />
            <Button
              disabled={selectedIngredients.length === 0}
              onClick={() => {
                fetchRecipes(1);
              }}
            >
              Find a recipe!
            </Button>
          </Box>
          {!!recipeResponse && (
            <>
              <Box>
                {recipeResponse.results.map((recipe, index) => {
                  return (
                    <IngredientCard
                      key={recipe.title + index}
                      recipe={recipe}
                    />
                  );
                })}
              </Box>
              <Pagination
                onChange={(_, pg) => {
                  fetchRecipes(pg);
                }}
                count={Math.ceil(recipeResponse?.totalResults / 10)}
              />
            </>
          )}
        </Box>
      )}
    </>
  );
}
