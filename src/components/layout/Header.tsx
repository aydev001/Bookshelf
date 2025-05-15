import { Box, IconButton, Typography } from '@mui/material';
import type { JSX } from 'react';
import logo from "../../assets/images/logo.svg"
import SearchInput from "../ui/SearchInput";
import notifImage from "../../assets/images/notification.svg"
import ProfileMenu from '../ui/ProfileMenu';

const Header = (): JSX.Element => {
    return (
        <Box height={"65px"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} gap={"10px"}>
            <Box display={"flex"} justifyContent={"start"} alignItems={"center"} gap={"15px"}>
                <Box display={"flex"} color={"#6200EE"} justifyContent={"start"} alignItems={"center"} gap={"10px"}>
                    <Box fontSize={"22px"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        <img width={"30px"} height={"30px"} src={logo} alt="logo" />
                    </Box>
                    <Box fontWeight={"800"} fontSize={"18px"}>Books <Typography fontWeight={"800"} fontSize={"16px"} component={"span"} color="white">List</Typography></Box>
                </Box>
                <SearchInput />
            </Box>
            <Box display={"flex"} justifyContent={"end"} alignItems={"center"} gap={"15px"}>
                <IconButton>
                    <img width={"20px"} height={"20px"} src={notifImage} alt="logo" />
                </IconButton>
                <ProfileMenu/>
            </Box>
        </Box>
    );
};

export default Header;