import { Box, Button, FormControl, FormHelperText, FormLabel, IconButton, InputAdornment, Link, OutlinedInput, Typography } from '@mui/material';
import type { JSX } from 'react';
import { CgClose } from 'react-icons/cg';
import { useDispatch } from 'react-redux';
import { setSignUpPage } from '../../app/features/ui/ui.slice';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { showErrorToast, showSuccessToast } from '../../utils/toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import type { AppDispatch } from '../../app/store';
import { setIsAuthenticated } from '../../app/features/auth/auth.slice';

const SignInForm = (): JSX.Element => {
    const dispatch = useDispatch<AppDispatch>()
    const validationSchema = z.object({
        username: z.string().nonempty("User name is required").min(3, "Minimum 3 characters").max(20, "Maximum 20 characters"),
        password: z.string().nonempty("Password is required").min(6, "Minimum 6 characters").max(20, "Maximum 20 characters")
    })

    type TValidationSchema = z.infer<typeof validationSchema>

    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
        reset,
        setValue
    } = useForm<TValidationSchema>({
        resolver: zodResolver(validationSchema)
    })

    const navigate = useNavigate()

    const onSubmit = async (data: TValidationSchema) => {
        try {
            const body = { userName: data.username, password: data.password }
            const res = await axios.post("https://bookshelf-api-production-b818.up.railway.app/api/users/login", body)
            localStorage.setItem("authToken", res.data.token)
            showSuccessToast("You have successfully logged in")
            dispatch(setIsAuthenticated(true))
            reset()
            navigate("/")
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                showErrorToast(error.response?.data.message || "Something went wrong. Please try again.");
            } else {
                console.error("Error:", error);
            }
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="on">
            <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
                <Typography variant="h5" color="#151515" mb={"10px"} fontSize={"24px"} fontWeight={"700"} textAlign={"center"}>
                    Sign in
                </Typography>
                <FormControl fullWidth error={errors.username?.message ? true : false}>
                    <FormLabel htmlFor='user-name' sx={{ fontSize: "14px", color: "black", fontWeight: "500" }}>Username</FormLabel>
                    <OutlinedInput 
                    {...register("username")} 
                    autoComplete='username'
                    sx={{ boxShadow: "0px 3px 22px 0px #3333330A" }} placeholder='Enter your name' id='user-name' size='small' />
                    <FormHelperText sx={{ margin: 0, minHeight: "10px" }}>{errors.username?.message}</FormHelperText>
                </FormControl>
                <FormControl fullWidth error={errors.password?.message ? true : false}>
                    <FormLabel htmlFor='password' sx={{ fontSize: "14px", color: "black", fontWeight: "500" }}>Password</FormLabel>
                    <OutlinedInput
                        {...register("password")}
                        type="password"
                        autoComplete="current-password"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    edge="end"
                                    size="small"
                                    sx={{ fontSize: "14px" }}
                                    onClick={() => setValue("password", "")}
                                >
                                    <CgClose />
                                </IconButton>
                            </InputAdornment>}
                        sx={{ boxShadow: "0px 3px 22px 0px #3333330A" }} placeholder='Enter your password' id='password' size='small' />
                    <FormHelperText sx={{ margin: 0, minHeight: "20px" }}>{errors.password?.message}</FormHelperText>
                </FormControl>
                <Button disabled={isSubmitting} type="submit" variant="contained" sx={{ mt: "10px" }}>
                    Sign in
                </Button>
                <Typography variant="subtitle1" color="initial" sx={{ textAlign: "center", fontSize: "14px" }}>
                    Already signed up? <Link underline={"none"} sx={{ cursor: "pointer" }} onClick={() => dispatch(setSignUpPage(true))}>Go to sign up</Link>.
                </Typography>
            </Box>
        </form>
    );
};

export default SignInForm;