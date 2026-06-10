import {
  Box,
  Button,
  Dialog,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { IFullRecipe } from "../utils/interfaces";
import { FaArrowRightLong, FaXmark } from "react-icons/fa6";

export default function RecipeModal({
  open,
  onClose,
  recipeInfo,
  sanitizedSummary,
}: {
  open: boolean;
  onClose: () => void;
  recipeInfo: IFullRecipe | null;
  sanitizedSummary: string;
}) {
  const isMobile = useMediaQuery("(max-width:600px)");

  if (recipeInfo === null) {
    return <></>;
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxHeight: "600px",
          minHeight: "1px",
          maxWidth: "600px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
            pr: "5px",
            py: "5px",
            borderBottom: "1px solid #d0cbc7",
          }}
        >
          <IconButton onClick={onClose}>
            <FaXmark />
          </IconButton>
        </Box>
        <Box sx={{ px: "20px", height: "100%", overflowY: "auto", mt: "10px" }}>
          <Box
            className="title-image"
            sx={{
              display: "flex",
              gap: 2,
              mb: "10px",
            }}
          >
            <img
              src={recipeInfo.image}
              height={isMobile ? "100px" : "150px"}
              style={{ borderRadius: "15px" }}
            />
            <Box sx={{ display: "flex", margin: "auto 0" }}>
              <Typography
                sx={{ fontWeight: 900 }}
                variant={isMobile ? "body1" : "h6"}
              >
                {recipeInfo.title}
              </Typography>
            </Box>
          </Box>
          {/* Summary arrives as HTML from the API; sanitized to strip everything except <b> and <a> */}
          <Box
            className="recipe-description"
            dangerouslySetInnerHTML={{ __html: sanitizedSummary }}
            sx={{
              mb: "20px",
              maxHeight: "calc(600px-10px-50px)",
              overflowY: "auto",
            }}
          />
        </Box>
        <Box
          sx={{
            position: "sticky",
            display: "flex",
            borderTop: "1px solid #d0cbc7",
            justifyContent: "right",
          }}
        >
          <Button
            component="a"
            href={recipeInfo.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "white", my: "20px", mr: "15px" }}
            variant="contained"
            color="secondary"
            size="medium"
            endIcon={<FaArrowRightLong />}
          >
            Go to this recipe
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
