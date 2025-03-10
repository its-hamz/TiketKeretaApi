"use client"

import { GerbongType } from "@/app/karyawan/types"
import { axiosIstance } from "@/helper/api"
import { getCookie } from "@/helper/clientCookie"
import { useRouter } from "next/navigation"
import { it } from "node:test"
import { useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import Seat from "./seat"

type Props = {
    schedule_id: number,
    wagons: GerbongType[]
}
type seatBook = {
    passanger_id: string
    passanger_name: string
    seat_number: string
}

const Booking = (myProps: Props) => {
    const [details, setDetails] = useState<seatBook[]>([])
    const [wagons, setWagons] = useState<GerbongType[]>([])
    const router = useRouter()

    // copy data array dari prop "Wagons" ke state "wagons"
    useEffect(() => {
        setWagons([...myProps.wagons])
    }, [myProps])

    const handleAddSeat = (seatBook: seatBook) => {
        const temp = [...details]
        temp.push(seatBook)
        setDetails(temp)

        const tempWagons = [...wagons]
        const findWagonIndex = tempWagons.findIndex(item => item.seats.map(item => item.seat_number).includes(seatBook.seat_number))
        
        // mencari posisi index dari kursi yang dipilih
        const findSeatIndex = tempWagons[findWagonIndex].seats.findIndex(item => item.seat_number === seatBook.seat_number) 

        // ubah status "used" menjadi true
        tempWagons[findWagonIndex].seats[findSeatIndex].used = true
        setWagons([...tempWagons])
    }
    const handleRemoveSeat = (index: number, seatBook: seatBook) => {
        const temp = [...details]
        temp.splice(index, 1)
        setDetails(temp)

        const tempWagons = [...wagons]
        const findWagonIndex = tempWagons.findIndex(item => item.seats.map(item => item.seat_number).includes(seatBook.seat_number))
        
        // mencari posisi index dari kursi yang dipilih
        const findSeatIndex = tempWagons[findWagonIndex].seats.findIndex(item => item.seat_number === seatBook.seat_number) 

        // ubah status "used" menjadi flase
        tempWagons[findWagonIndex].seats[findSeatIndex].used = false
        setWagons([...tempWagons])
    }

    const handleSave = async () => {
        try {
            if (details.length == 0) {
                toast(`pilih kursi dulu gantenk`, {
                    containerId: `toastAdd`,
                    type: `warning`
                })
                return
            }

            const url = `/purchase/customer`
            const requestData = {
                purchase_date: new Date().toISOString().substring(0, 10),
                schedule_id: myProps.schedule_id,
                details
            }

            const TOKEN = getCookie(`token`) || ""

            const response: any = await axiosIstance.post(url, requestData, {
                headers: {Authorization: `Bearer ${TOKEN}`}
            })
            if (response.data.success === true) {
                const message = response.data.message
                toast(message, {
                    containerId: `toastAdd`,
                    type: `success`
                })
                router.replace(`/customer/jadwal`)
            }
            
        } catch (error) {
            console.log(error)
            toast(`some thing wong`, {
                containerId: `toastAdd`,
                type: `error`
            });
            
        }
    }

    return (
        <div>
            <ToastContainer 
            containerId={`toastAdd`}/>
            {
                myProps.wagons.map((item, index) => (
                    <div key={`keyWagon-${index}`} className=" w-full my-2 p-3 rounded-md shadow-md border">
                        <h3 className=" font-semibold my-2 ">
                            {item.name}
                        </h3>
                        <div className=" flex flex-wrap gap-3">
                            {
                                item.seats.map((seat, indexSeat) => (
                                    <Seat
                                    key={`keySeat-${index}-${indexSeat}`}
                                    item={seat}
                                    onSave= {seatBook => handleAddSeat(seatBook)}
                                    /> 
                                ))
                            }
                        </div>
                    </div>
                ))
            }
            <button type="button" onClick={() => handleSave()} className=" w-full py-2 rounded-md my-2 bg-green-600 hover:bg-green-500 text-white">
                Pesan Sekarang
            </button>
        </div>
    )
}

export default Booking