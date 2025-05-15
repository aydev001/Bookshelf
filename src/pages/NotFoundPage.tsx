import { Box, Button } from '@mui/material';
import type { JSX } from 'react';
import notFountImage from "../assets/images/404.svg"
import { useNavigate } from 'react-router-dom';

const NotFoundPage = (): JSX.Element => {
  const navigate = useNavigate()
  return (
    <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} gap={"20px"} minHeight={"90vh"}>
      <Box
        component="img"
        src={notFountImage}
        alt="Example"
        sx={{ width: {xs : "80%", sm : "400px"}, height: 300}}
      />
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"} gap={"20px"}>
        <Button onClick={() => navigate("/")} sx={{textTransform : "none", px : "20px"}} variant="contained">
          Go Home Page
        </Button>
        <Button onClick={() => window.location.reload()} sx={{textTransform : "none", px : "20px"}} variant="outlined">
          Reload Page
        </Button>
      </Box>
    </Box>
  );
};

export default NotFoundPage;