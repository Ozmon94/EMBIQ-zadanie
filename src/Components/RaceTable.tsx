import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { StoreContext } from "../store/StoreProvider";
import { StoreType } from "../types/storeType";

export default function RaceTable() {
  const { race, year, driver, raceFetching, handleFetchDriver } = useContext(
    StoreContext
  ) as StoreType;

  if (raceFetching) return <CircularProgress />;
  if (!year) return <Typography>Select year to see race ranking</Typography>;
  if (race?.length === 0)
    return <Typography>No race on selected date</Typography>;

  if (race)
    return (
      <TableContainer sx={{ bgcolor: "lightgray" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="left">Position</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Team</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {race.map((race) => (
              <TableRow
                key={race.driver.id}
                onClick={() => handleFetchDriver(race.driver.id)}
                hover
                sx={
                  race.driver.id === driver?.id
                    ? { bgcolor: "rgba(0, 0, 0, 0.04)" }
                    : { cursor: "pointer" }
                }
              >
                <TableCell align="left">
                  {race.position === 0 ? "NC" : race.position}
                </TableCell>
                <TableCell align="left">{race.driver.name}</TableCell>
                <TableCell align="left">{race.team.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  return null;
}
