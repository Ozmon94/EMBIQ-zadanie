import { Box, Container, Grid } from "@mui/material";
import Carousel from "../../Components/Carousel";
import YearSelect from "../../Components/YearSelect";
import RaceTable from "../../Components/RaceTable";
import DriversDetails from "../../Components/DriversDetails";
import { useContext, useEffect } from "react";
import { StoreContext } from "../../store/StoreProvider";
import { StoreType } from "../../types/storeType";

export default function Home() {
  const { setSeasons, setCircuits } = useContext(StoreContext) as StoreType;

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const response = await fetch(
          "https://api-formula-1.p.rapidapi.com/seasons",
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "api-formula-1.p.rapidapi.com",
              "x-rapidapi-key": `${import.meta.env.VITE_RAPID_API}`,
            },
          }
        );
        const data = await response.json();
        setSeasons(data.response);
        sessionStorage.setItem("seasons", JSON.stringify(data.response));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchCircuits = async () => {
      try {
        const response = await fetch(
          "https://api-formula-1.p.rapidapi.com/circuits",
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "api-formula-1.p.rapidapi.com",
              "x-rapidapi-key": `${import.meta.env.VITE_RAPID_API}`,
            },
          }
        );
        const data = await response.json();
        setCircuits(data.response);
        sessionStorage.setItem("circuits", JSON.stringify(data.response));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (sessionStorage.getItem("seasons")) {
      setSeasons(JSON.parse(sessionStorage.getItem("seasons") as string));
    } else {
      fetchSeasons();
    }
    if (sessionStorage.getItem("circuits")) {
      setCircuits(JSON.parse(sessionStorage.getItem("circuits") as string));
    } else {
      fetchCircuits();
    }
  }, [setCircuits, setSeasons]);

  return (
    <Container sx={{ p: 4 }}>
      <Carousel />
      <YearSelect />
      <Grid container sx={{ my: 2 }} spacing={1}>
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              width: "100%",
              bgcolor: "lightGray",
              border: "1px solid Gray",
              minHeight: "250px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <RaceTable />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          {" "}
          <Box
            sx={{
              width: "100%",
              bgcolor: "lightgray",
              border: "1px solid gray",
              minHeight: "250px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              p: 2,
            }}
          >
            <DriversDetails />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
