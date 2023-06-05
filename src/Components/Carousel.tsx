import { Box, Button, Typography } from "@mui/material";

import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useContext } from "react";
import { StoreContext } from "../store/StoreProvider";
import { StoreType } from "../types/storeType";

export default function Carousel() {
  const { circuit, removeHandler, addHandler } = useContext(
    StoreContext
  ) as StoreType;

  return circuit ? (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ border: "1px solid", borderColor: "primary.light" }}>
        <img
          src={circuit.image}
          alt="Melbourne Grand Prix Circuit"
          style={{ width: "100%" }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          onClick={removeHandler}
          sx={{ textTransform: "uppercase", fontWeight: "bold" }}
        >
          <ArrowBackIosRoundedIcon sx={{ color: "red", fontSize: "16px" }} />
          prev
        </Button>
        <Typography sx={{ textAlign: "center" }}>{circuit.name}</Typography>
        <Button
          onClick={addHandler}
          sx={{ textTransform: "uppercase", fontWeight: "bold" }}
        >
          next
          <ArrowForwardIosRoundedIcon sx={{ color: "red", fontSize: "16px" }} />
        </Button>
      </Box>
    </Box>
  ) : (
    <Box></Box>
  );
}
