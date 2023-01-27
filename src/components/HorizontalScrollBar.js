import { Box } from "@mui/material";
import BodyPart from "./BodyPart";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { LeftArrow } from "./LeftArrow";
import { RightArrow } from "./RightArow";
const HorizontalScrollBar = ({ data, bodyPart, setBodyPart }) => {
  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
      {data.map((item) => {
        return (
          <Box key={item.id || item} itemId={item.id || item} m="0 40px">
            <BodyPart
              data={item}
              bodyPart={bodyPart}
              setBodyPart={setBodyPart}
            />
          </Box>
        );
      })}
    </ScrollMenu>
  );
};

export default HorizontalScrollBar;
