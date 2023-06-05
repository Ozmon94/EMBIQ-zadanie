import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import { useContext } from "react";
import { StoreContext } from "../store/StoreProvider";
import { StoreType } from "../types/storeType";

export default function YearSelect() {
  const { year, handleChangeYear, seasons } = useContext(
    StoreContext
  ) as StoreType;
  return (
    <FormControl
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        my: 1,
      }}
      size="small"
    >
      <Typography sx={{ fontSize: "14px", fontWeight: "bold", mr: 1 }}>
        Select year:
      </Typography>
      <Select
        value={year}
        onChange={handleChangeYear}
        sx={{
          width: "110px",
          outline: "2px solid gray",
          borderRadius: "5px",
          color: "black",
          p: "0 10px",
          fontWeight: "bold",
          fontSize: "14px",
        }}
        fullWidth
      >
        {seasons
          ? seasons.map((season, index) => (
              <MenuItem key={index} value={season}>
                {season}
              </MenuItem>
            ))
          : null}
      </Select>
    </FormControl>
  );
}
