"use client";
import {
  Box,
  Button,
  Divider,
  Pagination,
  Typography,
  useMediaQuery,
} from "@mui/material";
import IngredientSearch from "./components/IngredientSearch";
import {
  IFullRecipe,
  IIngredient,
  IRecipeSearchResponse,
} from "./utils/interfaces";
import { useCallback, useRef, useState } from "react";
import useSpoonacular from "./hooks/useSpoonacular";
import { AxiosResponse } from "axios";
import RecipeCard from "./components/RecipeCard";
import RecipeModal from "./components/RecipeModal";
import RecipeSearchEmptyState from "./components/RecipeSearchEmptyState";
import { FaSearch } from "react-icons/fa";
import { useToast } from "./hooks/useToast";
import { useLoading } from "./contexts/LoadingContext";

export default function Page() {
  const tagline =
    "Tell us what's in your pantry. We'll tell you what's cooking.";

  const [selectedIngredients, setSelectedIngredients] = useState<IIngredient[]>(
    [],
  );

  const [recipeResponse, setRecipeResponse] =
    useState<IRecipeSearchResponse | null>(null);
  const [recipeModalOpen, setRecipeModalOpen] = useState(false);
  const [recipeInfo, setRecipeInfo] = useState<IFullRecipe | null>(null);
  const [sanitizedSummary, setSanitizedSummary] = useState("");
  const spoonacularInstance = useSpoonacular();
  const { setLoading } = useLoading();

  const recipeResultsRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const fetchRecipes = useCallback(
    (offset: number) => {
      setLoading(true);
      const queryString = selectedIngredients
        .map((ingredient) => ingredient.name)
        .join(",");

      spoonacularInstance
        .get(
          `/recipes/complexSearch?includeIngredients=${queryString}&number=10&offset=${(offset - 1) * 10}`,
        )
        .then((res: AxiosResponse<IRecipeSearchResponse>) => {
          setRecipeResponse(res.data);
        })
        .catch((err) => {
          let errorMsg = "";
          if (err.response.status === 402) {
            errorMsg = "API quota reached. Please try again later.";
          } else {
            errorMsg = "Internal Server Error";
          }

          toast(errorMsg, { severity: "error" });
        })
        .finally(() => {
          setLoading(false);
          setTimeout(() => {
            recipeResultsRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }, 0);
        });
    },
    [selectedIngredients, setLoading, spoonacularInstance, toast],
  );

  const onCardClick = (recipeID: number) => {
    setLoading(true);
    spoonacularInstance
      .get(`/recipes/${recipeID}/information?includeNutrition=false`)
      .then((res: AxiosResponse<IFullRecipe>) => {
        setRecipeInfo(res.data);
        const sanitized = res.data.summary
          .replace(/<(?!\/?a[\s>])[^>]*>/gi, "")
          .replace(/<a\s/gi, '<a target="_blank" rel="noopener noreferrer" ');
        setSanitizedSummary(sanitized);
        setRecipeModalOpen(true);
      })
      .catch((err) => {
        let errorMsg = "";
        if (err.response.status === 402) {
          errorMsg = "API quota reached. Please try again later.";
        } else {
          errorMsg = "Internal Server Error";
        }
        toast(errorMsg, { severity: "error" });
      })
      .finally(() => setLoading(false));
  };

  const onModalClose = () => {
    setRecipeModalOpen(false);
    setRecipeInfo(null);
    setSanitizedSummary("");
  };

  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box
      sx={(theme) => ({
        background: theme.palette.background.paper,
        width: "1100px",
        maxWidth: isMobile ? "90%" : "80%",
        display: "flex",
        margin: "auto",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        my: "20px",
        borderRadius: "20px",
        minHeight: "calc(100vh - 40px)",
      })}
    >
      <Box
        className="title-container"
        sx={{ textAlign: "center", width: "550px", maxWidth: "90%" }}
      >
        <img width="100%" src="/Logo.png" alt="white plate" />
        <Typography variant="h6" sx={{ mb: "50px" }}>
          {tagline}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <IngredientSearch
          sx={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}
          selectedIngredients={selectedIngredients}
          setSelectedIngredients={setSelectedIngredients}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: "30px",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            disabled={selectedIngredients.length === 0}
            onClick={() => {
              fetchRecipes(1);
            }}
            startIcon={<FaSearch />}
          >
            Find a recipe
          </Button>
        </Box>
      </Box>
      {!!recipeResponse && <Divider sx={{ width: "40%", my: "25px"}} />}
      <Box
        ref={recipeResultsRef}
        className="recipe-paged-list"
        sx={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}
      >
        {!!recipeResponse &&
          (recipeResponse.results.length > 0 ? (
            <>
              <Box
                className="recipes"
                sx={{
                  overflowY: "scroll",
                  px: "20px",
                }}
              >
                {recipeResponse.results.map((recipe, index) => {
                  return (
                    <RecipeCard
                      onClick={() => onCardClick(recipe.id)}
                      key={recipe.title + index}
                      recipe={recipe}
                    />
                  );
                })}
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Pagination
                  onChange={(_, pg) => {
                    fetchRecipes(pg);
                  }}
                  count={Math.ceil(recipeResponse?.totalResults / 10)}
                  siblingCount={isMobile ? 0 : 1}
                />
              </Box>
            </>
          ) : (
            <RecipeSearchEmptyState />
          ))}
      </Box>
      <RecipeModal
        open={recipeModalOpen}
        onClose={onModalClose}
        recipeInfo={recipeInfo}
        sanitizedSummary={sanitizedSummary}
      />
    </Box>
  );
}
