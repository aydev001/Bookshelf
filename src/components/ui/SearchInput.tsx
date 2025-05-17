import { IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import { useEffect, useState, type JSX } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { CgClose } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { setFilerStatus, setFilterBooks } from '../../app/features/book/book.slice';
import type { RootState } from '../../app/store';

const SearchInput = (): JSX.Element => {
    const [title, setTitle] = useState<string>("");
    const dispatch = useDispatch();
    const { books } = useSelector((state: RootState) => state.book);

    useEffect(() => {
        const normalizedSearch = title.trim();
        if (normalizedSearch) {
            dispatch(setFilerStatus(true))
            const regex = new RegExp(normalizedSearch, 'i');
            const filtered = books.filter(book => regex.test(book.title));
            dispatch(setFilterBooks(filtered));
        } else {
            dispatch(setFilerStatus(false))
            dispatch(setFilterBooks([]));
        }
    }, [title, books, dispatch]);

    return (
        <OutlinedInput
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        edge="end"
                        size="small"
                        sx={{ fontSize: "16px" }}
                        onClick={() => setTitle("")}
                    >
                        <CgClose />
                    </IconButton>
                </InputAdornment>
            }
            startAdornment={
                <InputAdornment position="start" sx={{ fontSize: "18px" }}>
                    <BiSearchAlt />
                </InputAdornment>
            }
            sx={{
                bgcolor: "white",
                borderRadius: "6px",
                fontSize: "14px",
                display: { xs: "none", sm: "flex" }
            }}
            placeholder='Search book'
            id='search'
            size='small'
        />
    );
};

export default SearchInput;
