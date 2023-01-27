import { Typography, Box, Stack, Button } from "@mui/material";
import BodyPartImage from "../assets/icons/body-part.png";
import TargetImage from "../assets/icons/target.png";
import EquipmentImage from "../assets/icons/equipment.png";
import ExerciseDetail from "../pages/ExerciseDetail";
import { padding } from "@mui/system";

const Detail = ({ detailData }) => {
  const { bodyPart, gifUrl, name, target, equipment } = detailData;
  console.log(gifUrl);
  const extra = [
    {
      icon: BodyPartImage,
      name: bodyPart,
    },
    {
      icon: TargetImage,
      name: target,
    },
    {
      icon: EquipmentImage,
      name: equipment,
    },
  ];
  return (
    <Stack
      gap="60px"
      sx={{
        flexDirection: { lg: "row" },
        p: "20px",
        alignItems: "center",
      }}>
      <img src={gifUrl} alt={name} loading="lazy" className="detail-image" />
      <Stack sx={{ gap: { lg: "35px", xs: "20px" } }}>
        <Typography variant="h3" textTransform="capitalize">
          {name}
        </Typography>
        <Typography variant="h6">
          Exercises Keep you strong. {name} {` `} is one of the best exercise to
          target your {target}. It will help you to improve your mood and gain
          energy
        </Typography>
        {extra.map((item) => {
          return (
            <Stack
              key={item.name}
              alignItems="center"
              direction="row"
              gap="24px">
              <Button
                sx={{
                  background: "#fff2db",
                  borderRadius: "50%",
                  width: "100px",
                  height: "100px",
                }}>
                <img
                  src={item.icon}
                  alt={item.name}
                  style={{ height: "50px", width: "50px" }}
                />
              </Button>
              <Typography variant="h6" textTransform="capitalize">
                {item.name}
              </Typography>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default Detail;
