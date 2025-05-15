import { Box } from '@mui/material';
import type { JSX, ReactNode } from 'react';

interface IContainerProps {
  children : ReactNode
}

const Container = ({ children }: IContainerProps): JSX.Element => {
  return (
    <Box maxWidth={"1400px"} mx={"auto"} width={"90%"}>
      {children}
    </Box>
  );
};

export default Container;