import { Box } from '@mui/material';
import type { JSX } from 'react';
import Header from '../components/layout/Header';

const Home = (): JSX.Element => {

  return (
    <Box color={"white"}>
      <Header/>
      Home
    </Box>
  );
};

export default Home;