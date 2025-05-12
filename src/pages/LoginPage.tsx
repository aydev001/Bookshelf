import { Box } from '@mui/material';
import SignUpForm from "../components/ui/SignUpForm";
import SignInForm from "../components/ui/SignInForm";
import type { RootState } from '../app/store';
import { useSelector } from 'react-redux';
import type { JSX } from 'react';

const LoginPage = (): JSX.Element => {

  const isSignUpPage = useSelector((state: RootState) => state.ui.isSignUpPage);

  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} minHeight={"100vh"}>
      <Box bgcolor={"#FEFEFE"} borderRadius={"12px"} p={"28px"} width={"400px"} my={"10px"} mx={"5%"} boxShadow={"0px 4px 32px 0px #3333330A"}>

        {isSignUpPage ? <SignUpForm /> : <SignInForm />
        }
      </Box>
    </Box>
  );
};

export default LoginPage;