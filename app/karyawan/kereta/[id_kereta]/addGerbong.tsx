"use client"

import Modal from "@/components/modal"
import { axiosIstance } from "@/helper/api"
import { getCookie } from "@/helper/clientCookie"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { toast, ToastContainer } from "react-toastify"


type props = {
    idKereta: number
}
const AddGerbong = (myprops: props) => {
    const [name, SetName] = useState<string>("")
    const [seat_count, SetSeatCount] = useState<number>(0)
    const [train_id, SetTrainId] = useState<number>(0)
    const [show, setShow] = useState<boolean>(false)

    const router = useRouter()

    const openModal = () => {
        setShow(true)
        SetName("")
        SetSeatCount(0)
        SetTrainId(myprops.idKereta)
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const TOKEN = getCookie(`token`)
            const url = `/train/wagon`
            const requestData = {
                name,
                seat_count,
                train_id
            }

            const response: any = await axiosIstance.post(url, requestData, {
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
                        containerId: `toastAddGerbong`,
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
                        containerId: `toastAddGerbong`,
                        type: `warning`
                    }
                )

            }

        } catch (error) {
            console.log(error);
            toast(
                `sam ting wong`,
                {
                    containerId: `toastAddGerbong`,
                    type: `error`
                }
            )

        }
    }

    return (

        <div>
            <ToastContainer containerId={`toastAddGerbong`} />
            <button type="button" onClick ={() => openModal()} className=" px-2 py-2 rounded-md bg-green-500 hover:bg-green-400 text-white">
                Tambah Gerbong
            </button>
            <Modal isShow={show}>
                <form onSubmit={handleSubmit}>
                    {/* modal header */}
                    <div className=" w-full p-3 rounded-t-lg">
                        <h1 className=" font-semibold text-lg">
                            Tambah Gerbong Kereta
                        </h1>
                        <span className=" text-sm text-slate-500">
                            Pastikan data sudah diisi yang benar
                        </span>
                    </div>

                    {/* modal body */}
                    <div className=" w-full p-3">
                        <div className=" my-2 border rounded-md p-3">
                            <small className=" text-sm font-semibold text-sky-600">
                                Nama Gerbong
                            </small>
                            <input type="text" id={"name"} value={name} onChange={(e) => SetName(e.target.value)} required={true} className=" p-1 outline-none focus:border-b-sky-600 focus:border-b w-full" />
                        </div>
                        <div className=" my-2 border rounded-md p-3">
                            <small className=" text-sm font-semibold text-sky-600">
                                Jumlah Kursi
                            </small>
                            <input type="number" id={"seat_count"} value={seat_count.toString()} onChange={(e) => SetSeatCount(Number(e.target.value))} required={true} className=" p-1 outline-none focus:border-b-sky-600 focus:border-b w-full" />
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


export default AddGerbong