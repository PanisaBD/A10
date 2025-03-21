'use client'
import { useAppSelector,AppDispatch } from "@/redux/store"  
import { useDispatch } from "react-redux" 
import { removeBooking,bookSlice } from "@/redux/features/bookSlice"  


export default function BookingList() {

    const bookItems = useAppSelector((state) => state.bookSlice.bookItems)

    const dispatch = useDispatch<AppDispatch>()


    if (bookItems.length === 0) {
        return <div className="text-center py-8 text-gray-600 font-medium">No Venue Booking</div>
    }

    return (
        <div className="flex justify-center pt-12">
  
            <div className="flex flex-col w-full max-w-3xl bg-white rounded-lg px-5 py-4">
        
                {bookItems.map((bookingItem) => (
                    <div key={bookingItem.nameLastname} className="bg-slate-200 rounded px-5 py-3 my-3">
                        <div className="text-xl font-semibold">Booked Venue</div>
                        <div className="text-sm">Name: {bookingItem.nameLastname}</div>
                        <div className="text-sm">Tel: {bookingItem.tel}</div>
                        <div className="text-sm">Date: {bookingItem.bookDate}</div>
                        <div className="text-sm">Location: {bookingItem.venue}</div>

                        <div className="mt-4 flex justify-center">
                            <button 
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none"
                                onClick={() => dispatch(removeBooking(bookingItem))}
                            >
                                Cancel Booking
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
