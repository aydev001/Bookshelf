import { IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import type { JSX } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { CgClose } from 'react-icons/cg';

const SearchInput = (): JSX.Element => {
    return (
        <OutlinedInput
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        edge="end"
                        size="small"
                        sx={{ fontSize: "16px" }}
                    >
                        <CgClose />
                    </IconButton>
                </InputAdornment>}
            startAdornment={
                <InputAdornment position="start" sx={{ fontSize: "18px" }}>
                    <BiSearchAlt />
                </InputAdornment>
            }
            sx={{ bgcolor: "white", borderRadius: "6px", fontSize: "14px" }} placeholder='Search book' id='search' size='small' />
    );
};

export default SearchInput;