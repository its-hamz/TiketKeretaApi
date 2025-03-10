"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type props = {
    departured_location: string,
    arrived_location: string
}
const FilterJadwal = (myProps: props) => {

    const [departured_location, setDeparturedLocation] = useState<string>("")
    const [arrived_location, setArrivedLocation] = useState<string>("")
    const router = useRouter()

    const handleSearch = () => {
        if (departured_location !== "" && arrived_location !== "") {
            router.push(`/customer/jadwal?departured_location=${departured_location}&arrived_location=${arrived_location}`)
        }
    }

    // useEffect digunakan untuk update data saat komponen ini dimuat ulang 
    useEffect(() => {

        setDeparturedLocation(myProps.departured_location)
        setArrivedLocation(myProps.arrived_location)
    }, [myProps])

    return (
        <div className=" w-full my-5 flex flex-wrap items-center">
            <div className=" w-full md:w-1/2 p-3 rounded-md">
                <strong className=" font-semibold text-white">
                    Stasiun Asal
                </strong>
                <br />
                <input type="text" id={`departure_location`} value={departured_location} onChange={e => setDeparturedLocation(e.target.value)} className=" w-full border p-2 rounded-sm" />
            </div>
            <div className=" w-full md:w-1/2 p-3 rounded-md">
                <strong className=" font-semibold text-white">
                    Stasiun Tujuan
                </strong>
                <br />
                <input type="text" id={`departure_location`} value={arrived_location} onChange={e => setArrivedLocation(e.target.value)} className=" w-full border p-2 rounded-sm" />
            </div>

            <button type="button" onClick={() => handleSearch()} className=" px-4 py-2 rounded-md bg-orange-600 hover:bg-orange-500 text-white">
                Cari Jadwal
            </button>
        </div>
    )
}

export default FilterJadwal