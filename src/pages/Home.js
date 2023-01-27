import { Box } from "@mui/material";
import HeroBanner from "../components/HeroBanner";
import SearchExercises from "../components/SearchExercises";
import Exercises from "../components/Exercises";
import { useState, useEffect } from "react";
import { firestore } from "../firebase_setup/firebase";
import MembershipList from "../components/MembershipList";
import { useSelector } from "react-redux";

function Home() {
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState("all");
  const membership = useSelector((state) => state.memberships);

  return (
    <Box>
      <HeroBanner />
      <MembershipList membership={membership} />
      <SearchExercises
        exercises={exercises}
        setExercises={setExercises}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
      />

      <Exercises
        exercises={exercises}
        setExercises={setExercises}
        bodyPart={bodyPart}
      />
    </Box>
  );
}

export default Home;
