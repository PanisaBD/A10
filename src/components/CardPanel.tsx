"use client"

import { useReducer } from "react"
import Card from "./Card"
import Link from "next/link"

type RatingAction = { type: "update"; venueName: string; rating: number }
type RatingState = Map<string, number>

export default function CardPanel() {

    const ratingReducer = (state: RatingState, action: RatingAction) => {
        switch (action.type) {
            case "update":
                const newState = new Map(state);
                if (action.rating === 0) {
                    newState.delete(action.venueName);
                } else {
                    newState.set(action.venueName, action.rating);
                }
                return newState;
            default:
                return state;
        }
    };
    
    

    const [ratings, dispatchRating] = useReducer(ratingReducer, new Map([
        ["The Bloom Pavilion", 0],
        ["Spark Space", 0],
        ["The Grand Table", 0]
    ]))

    /**
     * Mock Data for demo
     */

    const mockVenueRepo = [
        {vid: "001", name:"The Bloom Pavilion", image: "/img/bloom.jpg"},
        {vid: "002", name:"Spark Space", image: "/img/sparkspace.jpg"},
        {vid: "003", name:"The Grand Table", image: "/img/grandtable.jpg"}
    ]


    return (
        <div className="p-5 bg-gray-100 rounded-lg">
            <div className="grid grid-cols-3 gap-4">
            {
                mockVenueRepo.map((venueItem) => (
                    <Link href={`/venue/${venueItem.vid}`}>
                        <Card 
    venueName={venueItem.name} 
    imgSrc={venueItem.image}
    rating={ratings.get(venueItem.name) ?? 0} // Get rating from state
    onRatingChange={(venue: string, rating: number) => 
        dispatchRating({ type: 'update', venueName: venue, rating }) // Pass the rating properly
    }
/>

                    </Link>
                    
                ))
            }

            </div>

            <div className="mt-5">
                <h2 className="text-lg font-semibold">Ratings List</h2>
                {Array.from(ratings.entries()).map(([venue, rating]) => (
                    <div key={venue} data-testid={venue} className="flex justify-between bg-white p-2 my-2 rounded shadow"
                        onClick={() => dispatchRating({ type: "update", venueName: venue, rating: 0 })}>
                        {venue} Rating: {rating}
                    </div>
                ))}
            </div>
        </div>
    )
}