import { VisibilityContext } from "react-horizontal-scrolling-menu";
import { useContext } from "react";
import { Typography } from "@mui/material";
import LeftArrowIcon from "../assets/icons/left-arrow.png";

export const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <Typography
      className="right-arrow"
      onClick={() => {
        scrollPrev();
      }}>
      <img src={LeftArrowIcon} alt="left-arrow" />
    </Typography>
  );
};
