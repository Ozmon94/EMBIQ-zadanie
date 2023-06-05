import { Dispatch, SetStateAction } from "react";
import { CircuitType } from "./circuitType";
import { RaceType } from "./raceType";
import { DriverType } from "./driverType";
import { SelectChangeEvent } from "@mui/material";

export type StoreType = {
  year: string;
  handleChangeYear: (e: SelectChangeEvent<string>) => void;
  circuits: CircuitType[];
  setCircuits: Dispatch<SetStateAction<CircuitType[]>>;
  seasons: string[];
  setSeasons: Dispatch<SetStateAction<string[]>>;
  circuit: CircuitType | null;
  addHandler: () => void;
  removeHandler: () => void;
  raceId: number | null;
  race: RaceType[] | null;
  handleFetchDriver: (id: number) => void;
  driver: DriverType | null;
  driverFetching: boolean;
  raceFetching: boolean;
};
