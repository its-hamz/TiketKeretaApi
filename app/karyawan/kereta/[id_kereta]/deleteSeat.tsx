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
const DeleteSeat = (myprops: props) => {
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

            const response: any = await axiosIstance.delete(url, {
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
                        containerId: `toastDeleteKursi-${myprops.seat.id}`,
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
                        containerId: `toastDeleteKursi-${myprops.seat.id}`,
                        type: `warning`
                    }
                )

            }

        } catch (error) {
            console.log(error);
            toast(
                `Some Thing Wong`,
                {
                    containerId: `toastDeleteKursi-${myprops.seat.id}`,
                    type: `error`
                }
            )

        }
    }

    return (

        <div>
            <ToastContainer containerId={`toastDeleteKursi-${myprops.seat.id}`} />
            <button type="button" onClick={() => openModal()} className=" size-6 rounded-md bg-red-600 hover:bg-red-500 flex justify-center items-center">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>



            </button>
            <Modal isShow={show}>
                <form onSubmit={handleSubmit}>
                    {/* modal header */}
                    <div className=" w-full p-3 rounded-t-lg">
                        <h1 className=" font-semibold text-lg">
                            Hapus Kursi
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
                        <button type="submit" className=" px-4 py-2 rounded-md bg-red-700 hover:bg-red-600 text-white">
                            Delete
                        </button>

                    </div>
                </form>
            </Modal>
        </div>
    )
}


export default DeleteSeat