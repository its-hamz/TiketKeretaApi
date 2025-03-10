"use client"

import Modal from "@/components/modal"
import { axiosIstance } from "@/helper/api"
import { getCookie } from "@/helper/clientCookie"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import { GerbongType, KeretaType } from "../../types"

type props = {
    wagon: GerbongType
}    

const EditGerbong = (myprops: props) => {
    const [name, setName] = useState<string>(myprops.wagon.name)
    const [seat_count, setSeatCount] = useState<number>(myprops.wagon.seat_count)
    const [show, setShow] = useState<boolean>(false)
    const router = useRouter()

    const openModal = () => {
        setShow(true)

    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async (e: FormEvent) => {

        try {
            e.preventDefault()
            const TOKEN = getCookie(`token`)
            const url = `/train/wagon/${myprops.wagon.id}`
            const requestData = {
                name,
                seat_count,
            }

            // hit endpoint
            const response: any = await axiosIstance.put(url, requestData, {
                headers: {
                    authorization: `Bearer ${TOKEN}`
                }
            })

            const message = response.data.message

            if (response.data.success === true) {
                toast(
                    message,
                    {
                        containerId: `toastEdit-${myprops.wagon.id}`,
                        type: `success`
                    }
                )
                setShow(false)
                // refresh page
                setTimeout(() => {
                    router.refresh(), 1000
                })
            }
            else {
                toast(
                    message,
                    {
                        containerId: `toastEdit-${myprops.wagon.id}`,
                        type: `warning`
                    }
                )
            }

        } catch (error) {
            console.log(error)
            toast(
                `Some Thing Wong`,
                {
                    containerId: `toastEdit-${myprops.wagon.id}`,
                    type: `error`
                }
            )

        }
    }

    return (
        <div>
            <ToastContainer containerId={`toastEdit-${myprops.wagon.id}`} />
            <button type="button" onClick={() => openModal()} className=" px-2 py-1 rounded-md bg-sky-600 hover:bg-sky-500 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>

            </button>
            <Modal isShow={show}>
                <form onSubmit={e => handleSubmit(e)}>
                    {/* modal header */}
                    <div className=" w-full p-3 rounded-t-lg">
                        <h1 className=" font-semibold text-lg">
                            Edit Data Gerbong
                        </h1>
                        <span className=" text-sm text-slate-500">
                            Pastikan Data Sudah Benar
                        </span>
                    </div>
                    {/* Modal Body */}
                    <div className=" w-full p-3">
                        <div className=" my-2 border rounded-md p-3">
                            <small className=" text-sm font-semibold text-sky-600">
                                Nama Gerbong
                            </small>
                            <input type="text" id={`name-${myprops.wagon.id}`} value={name} onChange={(e) => setName(e.target.value)} required={true} className=" p-1 outline-none focus:border-b-sky-600 focus:border-b w-full" />
                        </div>
                        <div className=" my-2 border rounded-md p-3">
                            <small className=" text-sm font-semibold text-sky-600">
                                Jumlah Kursi
                            </small>
                            <input type="number" id={`seat_count-${myprops.wagon.id}`} value={seat_count} onChange={(e) => setSeatCount(Number(e.target.value))} required={true} className=" p-1 outline-none focus:border-b-sky-600 focus:border-b w-full" />
                        </div>

                    </div>

                    {/* modal footer */}
                    <div className=" w-full p-3 rounded-b-lg flex items-center justify-end gap-2">
                        <button type="button" onClick={() => closeModal()} className=" px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 text-white">
                            Cancel
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

export default EditGerbong