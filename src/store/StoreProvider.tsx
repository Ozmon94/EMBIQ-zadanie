import { ReactNode, createContext, useEffect, useState } from "react";
import { StoreType } from "../types/storeType";
import { CircuitType } from "../types/circuitType";
import { RaceType } from "../types/raceType";
import { DriverType } from "../types/driverType";
import { SelectChangeEvent } from "@mui/material";

export const StoreContext = createContext<StoreType | null>(null);

const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [year, setYear] = useState<string>("");
  const [circuits, setCircuits] = useState<CircuitType[]>([]);
  const [seasons, setSeasons] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [circuit, setCircuit] = useState<CircuitType | null>(circuits[0]);
  const [raceId, setRaceId] = useState<number | null>(null);
  const [race, setRace] = useState<RaceType[] | null>(null);
  const [driverFetching, setDriverFetching] = useState(false);
  const [driver, setDriver] = useState<DriverType | null>(null);
  const [raceFetching, setRaceFetching] = useState(false);

  const handleChangeYear = (e: SelectChangeEvent<string>) => {
    setYear(e.target.value);
    setRace(null);
    setDriver(null);
  };

  const addHandler = () => {
    setIndex((prev) => {
      if (prev === circuits.length - 1) {
        return 0;
      } else {
        return prev + 1;
      }
    });
  };

  const removeHandler = () => {
    setIndex((prev) => {
      if (prev === 0) {
        return circuits.length - 1;
      } else {
        return prev - 1;
      }
    });
  };

  const handleFetchDriver = (id: number) => {
    if (!driverFetching) fetchDriver(id);
  };

  const fetchDriver = async (id: number) => {
    setDriverFetching(true);
    try {
      const response = await fetch(
        `https://api-formula-1.p.rapidapi.com/drivers?id=${id}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "api-formula-1.p.rapidapi.com",
            "x-rapidapi-key": `${import.meta.env.VITE_RAPID_API}`,
          },
        }
      );
      const data = await response.json();
      setDriver(data.response[0] || null);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setDriverFetching(false);
  };

  useEffect(() => {
    setCircuit(circuits[index]);
    setYear("");
    setRace(null);
    setDriver(null);
  }, [index, circuits]);

  useEffect(() => {
    const fetchRace = async () => {
      try {
        const response = await fetch(
          `https://api-formula-1.p.rapidapi.com/races?competition=${circuit?.competition.id}&type=race&season=${year}`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "api-formula-1.p.rapidapi.com",
              "x-rapidapi-key": `${import.meta.env.VITE_RAPID_API}`,
            },
          }
        );
        const data = await response.json();
        if (data.response.length === 0) {
          setRaceId(null);
          setRace([]);
        } else {
          setRaceId(data.response[0].id);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (circuit && year) {
      fetchRace();
    }
  }, [circuit, year]);

  useEffect(() => {
    const fetchRaceRanking = async () => {
      setRaceFetching(true);
      try {
        const response = await fetch(
          `https://api-formula-1.p.rapidapi.com/rankings/races?race=${raceId}`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "api-formula-1.p.rapidapi.com",
              "x-rapidapi-key": `${import.meta.env.VITE_RAPID_API}`,
            },
          }
        );
        const data = await response.json();
        setRace(data.response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setRaceFetching(false);
    };

    if (raceId) {
      fetchRaceRanking();
    }
  }, [raceId]);

  return (
    <StoreContext.Provider
      value={{
        year,
        handleChangeYear,
        circuits,
        setCircuits,
        seasons,
        setSeasons,
        circuit,
        addHandler,
        removeHandler,
        raceId,
        race,
        handleFetchDriver,
        driver,
        driverFetching,
        raceFetching,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
