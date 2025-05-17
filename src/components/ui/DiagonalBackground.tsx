import { Box } from '@mui/material';
import type { JSX } from 'react';

const DiagonalBackground = (): JSX.Element => {
  return (
    <Box position={"fixed"} top={0} left={0} right={0} bottom={0} bgcolor={"#F8F8F8"} zIndex={"-1"}>
      <Box sx={{
        position: "fixed",
        top: "50px",
        right: {
          xs : "32%",
          sm : "27%",
          md : "32%"
        },
        width: "150%",
        height: "250vh",
        backgroundColor: "#333333",
        zIndex: "-1",
        rotate: {
          xs : "20deg",
          sm : "30deg"
        },
        transformOrigin: "top right",
        borderRadius: "30px"
      }}>

      </Box>
    </Box>
  );
};

export default DiagonalBackground;