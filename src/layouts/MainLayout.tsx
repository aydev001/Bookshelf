import { Box, createTheme, ThemeProvider } from '@mui/material';
import type { JSX } from 'react';
import { Outlet } from 'react-router-dom';
import DiagonalBackground from '../components/ui/DiagonalBackground';
import { ToastContainer } from 'react-toastify';
import Header from '../components/layout/Header';
import Container from '../components/layout/Container';

const MainLayout = (): JSX.Element => {
    const theme = createTheme({
        typography: {
            "fontFamily": `"Mulish", sans-serif`
        },
        palette: {
            primary: { main: '#6200EE' },
            secondary: { main: '#ff4081' },
            error: { main: '#d32f2f' },
            warning: { main: '#ffa000' },
            info: { main: '#0288d1' },
            success: { main: '#388e3c' },
        }
    })
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Header />
                <Box mt={"20px"}>
                    <Outlet />
                </Box>
            </Container>

            <DiagonalBackground />
            <ToastContainer />
        </ThemeProvider>
    );
};

export default MainLayout;