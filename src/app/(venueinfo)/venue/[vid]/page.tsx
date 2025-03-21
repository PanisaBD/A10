import Image from "next/image"
import getVenue from "@/libs/getVenue"
import { VenueJson,VenueItem } from "../../../../../interface"
import Link from "next/link"
import Booking from "@/app/booking/page"

export default async function VenueDetailPage( {params}:{params:{vid:string}}) {
    const venueDetail = await getVenue(params.vid)
    /*
    const mockvenueRepo = new Map()
    mockvenueRepo.set("001",{name:"The Bloom Pavilion",imgSrc:"/img/bloom.jpg"})
    mockvenueRepo.set("002",{name: "Spark Space", imgSrc: "/img/sparkspace.jpg"})
    mockvenueRepo.set("003",{name: "The Grand Table", imgSrc: "/img/grandtable.jpg"})*/

    return(
     <main className="text-center p-5">
        <h1 className="text-lg font-medium"> {venueDetail.data.name}</h1>
        <div className="flex flex-row my-5">
             <Image src={venueDetail.data.picture} alt='venue image' width={0} height={0} sizes="100vw"
             className="rounded-lg w-[30%]"/>
             <div className="text-left">
             <div className="text-md mx-5">Address : {venueDetail.data.address}</div>
             <div className="text-md mx-5">District : {venueDetail.data.district}</div>
             <div className="text-md mx-5">Postal Code : {venueDetail.data.postalcode}</div>
             <div className="text-md mx-5">Tel : {venueDetail.data.tel}</div>
             <div className="text-md mx-5">Daily Rate : {venueDetail.data.dailyrate}</div>
             </div>
        </div>
     </main>
   )
}