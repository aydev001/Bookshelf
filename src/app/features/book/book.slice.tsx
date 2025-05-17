import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IBook } from '../../../utils/types/book.type';

interface BookState {
  books: IBook[];
  filterBooks : IBook[],
  filterStatus : boolean
}

const initialState: BookState = {
  books: [],
  filterBooks : [],
  filterStatus : false,
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks(state, action: PayloadAction<IBook[]>) {
      state.books = action.payload;
    },
    setFilterBooks(state, action: PayloadAction<IBook[]>) {
      state.filterBooks = action.payload;
    },
    setFilerStatus : (state, action: PayloadAction<boolean>) => {
      state.filterStatus = action.payload
    },
    clearBooks : (state) => {
      state.books = []
    }
  },
});

export const { setBooks, clearBooks, setFilterBooks, setFilerStatus} = bookSlice.actions;
export default bookSlice.reducer;
