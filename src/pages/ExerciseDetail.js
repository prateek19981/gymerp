import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import Detail from "../components/Detail";
import ExerciseVideos from "../components/ExerciseVideos";
import SimilarExercises from "../components/SimilarExercises";
import axios from "axios";
import { exerOptions, fetchData } from "../utils/fetchData";

const ExerciseDetail = () => {
  const [detailData, setDetailData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function getData() {
      const data = await fetchData(
        `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`,
        exerOptions
      );
      setDetailData(data);
    }
    getData();
  }, [id]);
  return (
    <Box>
      <Detail detailData={detailData} />
    </Box>
  );
};

export default ExerciseDetail;
