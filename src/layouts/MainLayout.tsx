import { createTheme, ThemeProvider } from '@mui/material';
import type { JSX } from 'react';
import { Outlet } from 'react-router-dom';
import DiagonalBackground from '../components/ui/DiagonalBackground';
import { ToastContainer } from 'react-toastify';

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
            <DiagonalBackground />
            <Outlet />
            <ToastContainer/>
        </ThemeProvider>
    );
};

export default MainLayout;