"use client";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  IconButton,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import useSpoonacular from "../hooks/useSpoonacular";
import { Dispatch, SetStateAction, useState } from "react";
import { IIngredient } from "../utils/interfaces";
import { AxiosResponse } from "axios";
import { useToast } from "../hooks/useToast";
import { FaQuestionCircle } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

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
  const [modalOpen, setModalOpen] = useState(false);

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
          let errorMsg = "";
          if (err.response.status === 402) {
            errorMsg = "API quota reached. Please try again later.";
          } else {
            errorMsg = "Internal Server Error";
          }

          toast(errorMsg, { severity: "error" });
        });
    }
  };

  const onSearchChange = (newValue: string) => {
    if (!!results) {
      setResults([]);
      setOpen(false);
    }

    setInputValue(newValue);
  };

  return (
    <Box sx={sx}>
      <Typography variant="body1">Add your ingredients</Typography>
      <Box sx={{ display: "flex", gap: "5px" }}>
        <Autocomplete
          slotProps={{
            popper: { placement: "top" },
            paper: { sx: { background: "white" } },
            root: {
              sx: {
                background: "white",
                borderRadius: "5px",
                flex: 1,
                minWidth: 0,
              },
            },
          }}
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
        <Box sx={{ display: "flex", margin: "auto" }}>
          <IconButton color="secondary" onClick={() => setModalOpen(true)}>
            <FaQuestionCircle />
          </IconButton>
        </Box>
      </Box>
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "1px",
            maxWidth: "400px",
          }}
        >
          <Box sx={{ margin: "20px" }}>
            <Typography variant="body1">
              {
                "Plate My Pantry takes ingredients from your pantry (or your refrigerator!) and turns them into delicious recipes."
              }
            </Typography>
            <br />
            <Typography variant="body1">
              {
                "Simply type the name of your ingredient, press enter, and select it from the provided list. Once you've added all your desired ingredients, press the Find a Recipe button to find your next meal."
              }
            </Typography>
            <Box
              sx={{
                marginTop: "20px",
                display: "flex",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <Button
                onClick={() => setModalOpen(false)}
                size="small"
                variant="contained"
                color="secondary"
              >
                Get Started
              </Button>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
