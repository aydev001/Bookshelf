import { MdOutlineLogout } from "react-icons/md";
import { Box, Button } from '@mui/material';
import type { JSX } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { setIsAuthenticated } from "../../app/features/auth/auth.slice";
import { clearBooks } from "../../app/features/book/book.slice";

const ProfileMenu = (): JSX.Element => {
    const dispatch = useDispatch<AppDispatch>()

    const handleClick = () => {
        localStorage.removeItem("authToken")
        dispatch(setIsAuthenticated(false));
        dispatch(clearBooks())
    };

    return (
        <div>
            <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={handleClick}
                sx={{ fontSize: "14px", color: "red", gap: "5px", fontWeight: "600", textTransform: "none" }}
            >
                <Box>
                    Logout
                </Box>
                <MdOutlineLogout />
            </Button>
        </div>
    )
}

export default ProfileMenu;