import { Avatar, Box, CircularProgress, Typography } from "@mui/material";
import { useContext } from "react";
import { StoreContext } from "../store/StoreProvider";
import { StoreType } from "../types/storeType";

export default function DriversDetails() {
  const { driver, driverFetching } = useContext(StoreContext) as StoreType;
  if (driverFetching) return <CircularProgress />;
  if (!driver) return <Typography>Select driver</Typography>;

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        p: 2,
      }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Avatar
          alt={driver.name}
          src={driver.image}
          sx={{ width: 160, height: 160, mb: 4 }}
        />
      </Box>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
        {driver.name}
      </Typography>
      <Typography>
        <b>Team:</b> {driver.teams[0].team.name}
      </Typography>
      <Typography>
        <b>Country:</b> {driver.country.name}
      </Typography>
      <Typography>
        <b>Points:</b> {driver.career_points}
      </Typography>
      <Typography>
        <b>Grands Prix entered:</b>{" "}
        {driver.grands_prix_entered ? driver.grands_prix_entered : 0}
      </Typography>
      <Typography>
        <b>World Chanpionship:</b> {driver.world_championships}
      </Typography>
      <Typography>
        <b>Day of birth:</b> {driver.birthdate}
      </Typography>
      {driver.birthplace ? (
        <Typography>
          <b>Place of birth:</b> {driver.birthplace}
        </Typography>
      ) : null}
    </Box>
  );
}
