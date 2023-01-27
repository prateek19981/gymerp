import { VisibilityContext } from "react-horizontal-scrolling-menu";
import { useContext } from "react";
import { Typography } from "@mui/material";
import RightArrowIcon from "../assets/icons/right-arrow.png";

export const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Typography
      className="left-arrow"
      onClick={() => {
        scrollNext();
      }}>
      <img src={RightArrowIcon} alt="right-arrow" />
    </Typography>
  );
};
