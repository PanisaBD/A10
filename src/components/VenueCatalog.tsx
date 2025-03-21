import Card from "./Card"
import Link from "next/link"
import { VenueItem,VenueJson } from "../../interface";

export default async function VenueCatalog({venuesJson}: {venuesJson: Promise<VenueJson>}) {
  // Handle both Promise and resolved object cases
  const venueJsonReady = await Promise.resolve(venuesJson);
  
  return (
    <>
      Explore {venueJsonReady.count} venues in our catalog
      <div className="grid grid-cols-3 gap-4">
        {
          venueJsonReady.data.map((venueItem: VenueItem) => (
            <Link href={`/venue/${venueItem.id}`} key={venueItem.id}>
              <Card
                venueName={venueItem.name}
                imgSrc={venueItem.picture}
              />
            </Link>
          ))
        }
      </div>
    </>
  )
}