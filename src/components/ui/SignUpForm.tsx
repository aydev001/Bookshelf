import { Box, Button, FormControl, FormHelperText, FormLabel, IconButton, InputAdornment, Link, OutlinedInput, Typography } from '@mui/material';
import type { JSX } from 'react';
import { CgClose } from 'react-icons/cg';
import { useDispatch } from 'react-redux';
import { setSignUpPage } from '../../app/features/ui/ui.slice';
import { useForm, type FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { showErrorToast, showSuccessToast } from '../../utils/toast';
import axios from "axios"

const SignUpForm = (): JSX.Element => {
    const dispatch = useDispatch()

    const validationSchema = z.object({
        userName: z.string().nonempty("User name is required").min(3, "Minimum 3 characters").max(20, "Maximum 3 characters"),
        password: z.string().nonempty("Password is required").min(6, "Minimum 6 characters").max(20, "Maximum 20 characters"),
        confirmPassword: z.string().nonempty("Confirm password is required").min(6, "Minimum 6 characters").max(20, "Maximum 20 characters")
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords must match",
        path: ["confirmPassword"]
    })

    type TValidationSchema = z.infer<typeof validationSchema>

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
        setValue
    } = useForm<TValidationSchema>({
        resolver: zodResolver(validationSchema)
    })

    const onSubmit = async (data: FieldValues) => {
        try {
            const body = { userName: data.userName, password: data.password }
            await axios.post("https://bookshelf-api-production-b818.up.railway.app/api/users/register", body)
            showSuccessToast("Successful registration")
            reset()
            dispatch(setSignUpPage(false))
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                showErrorToast(error.response?.data.message)
            } else {
                console.error("Error:", error);
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
                <Typography variant="h5" color="#151515" mb={"10px"} fontSize={"24px"} fontWeight={"700"} textAlign={"center"}>
                    Sign up
                </Typography>
                <FormControl fullWidth error={errors.userName?.message ? true : false}>
                    <FormLabel htmlFor='user-name' sx={{ fontSize: "14px", color: "black", fontWeight: "500" }}>Username</FormLabel>
                    <OutlinedInput {...register("userName")} sx={{ boxShadow: "0px 3px 22px 0px #3333330A" }} placeholder='Enter your name' id='user-name' size='small' />
                    <FormHelperText sx={{ margin: 0, minHeight: "10px" }}>{errors.userName?.message}</FormHelperText>
                </FormControl>
                <FormControl fullWidth error={errors.password?.message ? true : false}>
                    <FormLabel htmlFor='password' sx={{ fontSize: "14px", color: "black", fontWeight: "500" }}>Password</FormLabel>
                    <OutlinedInput
                        {...register("password")}
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
                <FormControl fullWidth error={errors.confirmPassword?.message ? true : false}>
                    <FormLabel htmlFor='confirm-password' sx={{ fontSize: "14px", color: "black", fontWeight: "500" }}>Confirm password</FormLabel>
                    <OutlinedInput
                        {...register("confirmPassword")}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    edge="end"
                                    size="small"
                                    sx={{ fontSize: "14px" }}
                                    onClick={() => setValue("confirmPassword", "")}
                                >
                                    <CgClose />
                                </IconButton>
                            </InputAdornment>}
                        sx={{ boxShadow: "0px 3px 22px 0px #3333330A" }} placeholder='Enter your confirm password' id='confirm-password' size='small' />
                    <FormHelperText sx={{ margin: 0, minHeight: "20px" }}>{errors.confirmPassword?.message}</FormHelperText>
                </FormControl>
                <Button type="submit" variant="contained" sx={{ mt: "10px" }}>
                    Submit
                </Button>
                <Typography variant="subtitle1" color="initial" sx={{ textAlign: "center", fontSize: "14px" }}>
                    Already signed up? <Link underline={"none"} sx={{ cursor: "pointer" }} onClick={() => dispatch(setSignUpPage(false))}>Go to sign in</Link>.
                </Typography>
            </Box>
        </form>
    );
};

export default SignUpForm;