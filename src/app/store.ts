import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/auth.slice"
import uiReducer from "./features/ui/ui.slice"
import bookReducer from "./features/book/book.slice"
import { bookApi } from "./services/bookApi";

export const store = configureStore({
    reducer : {
        auth : authReducer,
        ui : uiReducer,
        book : bookReducer,
        [bookApi.reducerPath] : bookApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(bookApi.middleware),
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch