import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookingItem } from "../../../interface";

type BookState = {
    bookItems: BookingItem[];
};

const initialState: BookState = { bookItems: [] };

export const bookSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        addBooking: (state, action: PayloadAction<BookingItem>) => {
            const existingBookingIndex = state.bookItems.findIndex(
                (booking) =>
                    booking.venue === action.payload.venue &&
                    booking.bookDate === action.payload.bookDate
            );

            if (existingBookingIndex !== -1) {
                state.bookItems[existingBookingIndex] = action.payload;
            } else {

                state.bookItems.push(action.payload);
            }
        },
        removeBooking: (state, action: PayloadAction<BookingItem>) => {
            state.bookItems = state.bookItems.filter(
                (item) =>
                    item.venue !== action.payload.venue ||
                    item.bookDate !== action.payload.bookDate ||
                    item.nameLastname !== action.payload.nameLastname ||
                    item.tel !== action.payload.tel
            );
        },
    },
});

export const { addBooking, removeBooking } = bookSlice.actions;
export default bookSlice.reducer;
