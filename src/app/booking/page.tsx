"use client"
import DateReserve from "@/components/DateReserve";
import { TextField } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { BookingItem } from "../../../interface";
import dayjs from "dayjs";
import { addBooking } from "@/redux/features/bookSlice";

export default function Booking() {
    const urlParams = useSearchParams();
    // Get initial values from URL params or set to empty string if null
    const initialNameLastname = urlParams.get('nameLastname') || '';
    const initialTel = urlParams.get('tel') || '';
    
    // Add state to track form inputs
    const [nameLastname, setNameLastname] = useState(initialNameLastname);
    const [tel, setTel] = useState(initialTel);
    const [bookingDate, setBookingDate] = useState<Dayjs|null>(null);
    const [bookingLocation, setBookingLocation] = useState<string>("Bloom");
    
    const dispatch = useDispatch<AppDispatch>();
    
    const createBooking = () => {
        // Make sure we have all required data
        if(nameLastname && tel && bookingDate && bookingLocation) {
            const item: BookingItem = {
                nameLastname: nameLastname,
                tel: tel,
                venue: bookingLocation,
                bookDate: dayjs(bookingDate).format("YYYY/MM/DD")
            };
            
            dispatch(addBooking(item));
            
            // Add feedback for user
            alert("Booking created successfully!");
            
            // Optionally clear form
            setNameLastname('');
            setTel('');
            setBookingDate(null);
        } else {
            alert("Please fill in all required fields");
        }
    };

    return (
        <main className="w-full flex flex-col items-center space-y-4 p-12">
            <div className="text-xl font-medium">New Booking</div>
            
            <div className="text-md text-left text-gray-600 w-full max-w-md">Enter your name-lastname</div>
            <TextField
                label="Name-Lastname"
                name="Name-Lastname"
                variant="standard"
                fullWidth
                className="max-w-md"
                value={nameLastname}
                onChange={(e) => setNameLastname(e.target.value)}
            />
            
            <div className="text-md text-left text-gray-600 w-full max-w-md">Enter your telephone number</div>
            <TextField
                label="Contact-Number"
                name="Contact-Number"
                variant="standard"
                type="tel"
                fullWidth
                className="max-w-md"
                value={tel}
                onChange={(e) => setTel(e.target.value)}
            />
            
            <div className="text-md text-left text-gray-600 w-full max-w-md">Date and Location</div>
            <DateReserve 
                onDateChange={(value: Dayjs) => {setBookingDate(value)}}
                onLocationChange={(value: string) => {setBookingLocation(value)}}
            />
            
            <button
                name="Book Venue"
                className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-300 ease-in-out"
                onClick={createBooking}
            >
                Book Venue
            </button>
        </main>
    );
}