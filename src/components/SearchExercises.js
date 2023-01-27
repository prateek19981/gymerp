import React, { useEffect, useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { fetchData, exerOptions } from "../utils/fetchData";
import HorizontalScrollBar from "./HorizontalScrollBar";
import LeftArrowIcon from "../assets/icons/left-arrow.png";
import { useContext } from "react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";

const SearchExercises = ({
  exercises,
  setExercises,
  bodyPart,
  setBodyPart,
}) => {
  const [search, setSearch] = useState("");

  const [bodyParts, setBodyParts] = useState([]);
  async function handleSearch() {
    if (search) {
      const exerData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises",
        exerOptions
      );
      let searched = exerData.filter((item) => {
        return (
          item.bodyPart.toLowerCase().includes(search) ||
          item.equipment.toLowerCase().includes(search) ||
          item.name.toLowerCase().includes(search) ||
          item.target.toLowerCase().includes(search)
        );
      });

      setSearch("");
      setExercises(searched);
    }
  }
  useEffect(() => {
    const getBodyParts = async function () {
      const bodyparts = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
        exerOptions
      );
      setBodyParts(["all", ...bodyparts]);
    };
    getBodyParts();
  }, []);
  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: "44px", xs: "30px" } }}
        mb="50px"
        textAlign="center">
        Exercises You <br /> Should Know
      </Typography>
      <Box position="relative" mb="72px">
        <TextField
          height="76px"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value.toLowerCase());
          }}
          placeholder="search exercises"
          sx={{
            input: { fontWeight: "600", textAlign: "center" },
            width: { lg: "1170px", xs: "350px" },
            backgroundColor: "white",
          }}
        />
        <Button
          className="search-btn"
          sx={{
            bgcolor: "red",
            color: "#fff",
            textTransform: "none",
            width: { lg: "175px", xs: "80px" },
            height: "56px",
            position: "absolute",
            right: "0px",
          }}
          onClick={handleSearch}>
          Search
        </Button>
      </Box>
      <Box sx={{ position: "relative", width: "100%", p: "20px" }}>
        <HorizontalScrollBar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
        />
      </Box>
    </Stack>
  );
};
export default SearchExercises;
