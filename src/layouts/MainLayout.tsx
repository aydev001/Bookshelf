import { Box, createTheme, ThemeProvider } from '@mui/material';
import { useEffect, type JSX } from 'react';
import { Outlet } from 'react-router-dom';
import DiagonalBackground from '../components/ui/DiagonalBackground';
import { ToastContainer } from 'react-toastify';
import Container from '../components/layout/Container';
import { useDispatch } from 'react-redux';
import { useGetBooksQuery } from '../app/services/bookApi';
import { setIsAuthenticated } from '../app/features/auth/auth.slice';
import { setBooks } from '../app/features/book/book.slice';

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

    const dispatch = useDispatch()
    const token = localStorage.getItem('authToken');

    const { data, isLoading, isError} = useGetBooksQuery(undefined, { skip: !token })

    useEffect(() => {
        if (token) {
            if (data) {
                dispatch(setIsAuthenticated(true));
                dispatch(setBooks(data));
            } else if (isError) {
                dispatch(setIsAuthenticated(false));
            }
        } else {
            dispatch(setIsAuthenticated(false));

        }
    }, [data, isError, token]);

    return (
        <ThemeProvider theme={theme}>
            <Container>
                {isLoading ? <Box fontSize={"30px"} color={"gray"} height={"100vh"} display={"flex"} justifyContent={"center"} alignItems={"center"} fontWeight={"800"}>Loading...</Box> : <Outlet />}
            </Container>

            <DiagonalBackground />
            <ToastContainer />
        </ThemeProvider>
    );
};

export default MainLayout;