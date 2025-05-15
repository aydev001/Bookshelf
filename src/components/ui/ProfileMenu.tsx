import { MdLogout } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { BiUserCircle } from "react-icons/bi";
import { IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { useState, type JSX } from 'react';

const ProfileMenu = (): JSX.Element => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                id="basic-button"
                onClick={handleClick}
                sx={{ fontSize: "25px", color: "#333333", p: "5px" }}
            >
                <BiUserCircle />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                PaperProps={{
                    sx: {
                        boxShadow: '0px 1px 8px rgba(0,0,0,0.2)',
                        borderRadius: "5px",
                    },
                }}
            >
                <MenuItem sx={{ fontSize: "14px", pl: "10px" }} onClick={handleClose}>
                    <ListItemIcon sx={{ fontSize: "16px", justifyContent: "center" }}>
                        <FiSettings />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem sx={{ fontSize: "14px", pl: "10px" }} onClick={handleClose}>
                    <ListItemIcon sx={{ fontSize: "16px", justifyContent: "center" }}>
                        <MdLogout />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </div>
    )
}

export default ProfileMenu;