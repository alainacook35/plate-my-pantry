"use client";
import {
  Autocomplete,
  Box,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import useSpoonacular from "../hooks/useSpoonacular";
import { Dispatch, SetStateAction, useState } from "react";
import { IIngredient } from "../utils/interfaces";
import { AxiosResponse } from "axios";
import { useToast } from "../hooks/useToast";

export default function IngredientSearch({
  selectedIngredients,
  setSelectedIngredients,
  sx,
}: {
  selectedIngredients: IIngredient[];
  setSelectedIngredients: Dispatch<SetStateAction<IIngredient[]>>;
  sx?: SxProps;
}) {
  const spoonacularInstance = useSpoonacular();

  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState<IIngredient[]>([]);

  const [open, setOpen] = useState(false);

  const { toast } = useToast();
  
  const searchIngredients = async (searchTerm: string) => {
    if (searchTerm.trim() !== "") {
      spoonacularInstance
        .get(`/food/ingredients/autocomplete?query=${searchTerm}`)
        .then((res: AxiosResponse<IIngredient[]>) => {
          setResults(res.data);
          setOpen(true);
        })
        .catch((err) => {
          let errorMsg = ""
          if (err.response.status === 402) {
            errorMsg = "API quota reached. Please try again later."
          } else {
            errorMsg = "Internal Server Error"
          }

          toast(errorMsg, { severity: 'error'})
        });
    }
  };

  const onSearchChange = (newValue: string) => {
    if (results?.length > 0) {
      setResults([]);
      setOpen(false);
    }

    setInputValue(newValue);
  };

  return (
    <Box sx={sx}>
      <Typography variant="body1">Add your ingredients</Typography>
      <Autocomplete
        open={open}
        disableCloseOnSelect={true}
        clearOnEscape={false}
        clearOnBlur={false}
        multiple
        filterOptions={(opt) => opt}
        onInputChange={(_, newValue, reason) => {
          if (reason === "input") {
            onSearchChange(newValue);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !open) {
            e.preventDefault();
            searchIngredients(inputValue);
          }
        }}
        renderInput={(params) => (
          <TextField placeholder="Search for ingredients" {...params} />
        )}
        options={results}
        getOptionLabel={(opt: IIngredient) => opt?.name}
        noOptionsText="No matching ingredients found"
        onBlurCapture={() => setOpen(false)}
        onFocus={() => {
          if (results.length > 0) {
            setOpen(true);
          }
        }}
        value={selectedIngredients}
        onChange={(_, value) => {
          setSelectedIngredients(value);
        }}
      />
    </Box>
  );
}
