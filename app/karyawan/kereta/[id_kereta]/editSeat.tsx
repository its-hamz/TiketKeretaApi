"use client"

import Modal from "@/components/modal"
import { axiosIstance } from "@/helper/api"
import { getCookie } from "@/helper/clientCookie"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import { KursiType } from "../../types"


type props = {
    seat: KursiType
}
const EditSeat = (myprops: props) => {
    const [seat_number, SetSeat_number] = useState<string>("")
    const [show, setShow] = useState<boolean>(false)

    const router = useRouter()

    const openModal = () => {
        setShow(true)
        SetSeat_number(myprops.seat.seat_number)
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        const wagon_id = myprops.seat.wagon_id
        try {
            e.preventDefault()
            const TOKEN = getCookie(`token`)
            const url = `/train/wagon/seat/${myprops.seat.id}`
            const requestData = {
                seat_number,
                wagon_id
            }

            const response: any = await axiosIstance.put(url, requestData, {
                headers: {
                    authorization: `Bearer ${TOKEN}`
                }
            })

            const message = response.data.message
            if (response.data.success === true) {
                setShow(false)
                toast(
                    message,
                    {
                        containerId: `toastEditKursi-${myprops.seat.id}`,
                        type: `success`
                    }
                )
                // refresh page
                setTimeout(() =>
                    router.refresh(), 1000
                )
            }
            else {
                toast(message,
                    {
                        containerId: `toastEditKursi-${myprops.seat.id}`,
                        type: `warning`
                    }
                )

            }

        } catch (error) {
            console.log(error);
            toast(
                `Some Thing Wong`,
                {
                    containerId: `toastEditKursi-${myprops.seat.id}`,
                    type: `error`
                }
            )

        }
    }

    return (

        <div>
            <ToastContainer containerId={`toastEditKursi-${myprops.seat.id}`} />
            <button type="button" onClick={() => openModal()} className=" size-6 rounded-md bg-sky-500 hover:bg-sky-400 flex justify-center items-center">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>


            </button>
            <Modal isShow={show}>
                <form onSubmit={handleSubmit}>
                    {/* modal header */}
                    <div className=" w-full p-3 rounded-t-lg">
                        <h1 className=" font-semibold text-lg">
                            Edit Kursi
                        </h1>
                        <span className=" text-sm text-slate-500">
                            Pastikan Sudah Benar
                        </span>
                    </div>

                    {/* modal body */}
                    <div className=" w-full p-3">
                        <div className=" my-2 border rounded-md p-3">
                            <small className=" text-sm font-semibold text-sky-600">
                                Nomor Kursi
                            </small>
                            <input type="text" id={"seat_number"} value={seat_number} onChange={(e) => SetSeat_number(e.target.value)} required={true} className=" p-1 outline-none focus:border-b-sky-600 focus:border-b w-full" />
                        </div>

                    </div>

                    {/* modal footer */}
                    <div className=" w-full p-3 rounded-b-lg flex items-center justify-end gap-2">
                        <button type="button" onClick={() => closeModal()} className=" px-4 py-2 rounded-md bg-red-700 hover:bg-red-600 text-white">
                            Close
                        </button>
                        <button type="submit" className=" px-4 py-2 rounded-md bg-green-700 hover:bg-green-600 text-white">
                            Save
                        </button>

                    </div>
                </form>
            </Modal>
        </div>
    )
}


export default EditSeat