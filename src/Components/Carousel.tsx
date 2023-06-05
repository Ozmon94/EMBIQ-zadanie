import { Box, Button, Typography } from "@mui/material";

import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useContext, useState } from "react";
import { StoreContext } from "../store/StoreProvider";
import { StoreType } from "../types/storeType";
import Draggable, { DraggableEventHandler } from "react-draggable";

export default function Carousel() {
  const { circuit, removeHandler, addHandler } = useContext(
    StoreContext
  ) as StoreType;

  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleOnStop: DraggableEventHandler = (e, data) => {
    if (data.x <= -10) {
      addHandler();
    }
    if (data.x >= 10) {
      removeHandler();
    }
    setPosition({ x: 0, y: 0 });
  };

  if (!circuit) return <Box></Box>;
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          border: "1px solid",
          borderColor: "primary.light",
          overflow: "hidden",
        }}
      >
        <Draggable axis="x" onStop={handleOnStop} position={position}>
          <Box>
            <img
              src={circuit.image}
              alt="Melbourne Grand Prix Circuit"
              style={{ width: "100%", pointerEvents: "none" }}
            />
          </Box>
        </Draggable>
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
  );
}
