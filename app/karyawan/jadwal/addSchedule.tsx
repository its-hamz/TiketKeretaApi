"use client"

import Modal from "@/components/modal"
import { axiosIstance } from "@/helper/api"
import { getCookie } from "@/helper/clientCookie"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import DatePicker from "react-datepicker"
import { toast, ToastContainer } from "react-toastify"
import { KeretaType } from "../types"

type Props = {
    trains: KeretaType[]
    // menyimpan array semua data kereta
}

const AddSchedule = (myProps: Props) => {
    const router = useRouter()
    const [show, setShow] = useState<boolean>(false)

    const [departured_location, setDeparturedLocation] = useState<string>("")
    const [arrived_location, setArrivedLocation] = useState<string>("")
    const [departured_time, setDeparturedTime] = useState<Date>(new Date())
    const [arrived_time, setArrivedTime] = useState<Date>(new Date())
    const [train_id, setTrainId] = useState<number>(0)
    const [price, setPrice] = useState<number>(0)

    const openModal = () => {
        setShow(true)
        setDeparturedLocation("")
        setArrivedLocation("")
        setDeparturedTime(new Date())
        setArrivedTime(new Date())
        setTrainId(0)
        setPrice(0)
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const url = `/schedule`
            const requestData = {
                departured_location,
                arrived_location,
                departured_time,
                arrived_time,
                train_id,
                price
            }

            const TOKEN = getCookie(`token`)
            const response: any = await axiosIstance.post(url, requestData, {
                headers: {
                    Authorization: `Bearer ${getCookie(`token`)}`
                }
            })

            const message = response.data.message

            if (response.data.success === true) {
                setShow(false)
                toast(message, {
                    containerId: `toastAdd`,
                    type: `success`
                })
                setTimeout(() => router.refresh(), 1000)
            }

            else {
                toast(message, {
                    containerId: `toastAdd`,
                    type: `warning`
                })
            }
        } catch (error) {
            console.log(error);
            toast(`Some Thing Wong`,
                {
                    containerId: `toastAdd`,
                    type: `error`
                }
            )

        }
    }

    return (
        <div>
            <ToastContainer containerId={`toastAddJadwal`} />
            <button className=" px-4 py-2 rounded-md bg-green-600 hover:bg-green-500 text-white" type="button" onClick={() => openModal()}>
                Tambah Jadwal Kereta
            </button>

            <Modal isShow={show}>
                <form onSubmit={handleSubmit}>
                    {/* modal header */}
                    <div className=" w-full p-3 rounded-t-lg">
                        <h1 className=" font-semibold text-lg">
                            Tambah Data Jadwal Kereta
                        </h1>
                        <span className=" text-sm text-slate-500">
                            Pastikan data sudah diisi yang benar
                        </span>
                    </div>

                    {/* modal body */}
                    <div className=" w-full p-3">
                        <div className=" my-2 border rounded-md p-2">
                            <small className=" text-xs font-semibold text-sky-500">
                                Berangkat Dari
                            </small>
                            <input type="text" id={`departured_location`} onChange={(e) => setDeparturedLocation(e.target.value)} className=" w-full p-1 outline-none hover:border-b hover: border-b-sky-500" required={true} />
                        </div>
                        <div className=" my-2 border rounded-md">
                            <small className=" text-xs font-semibold text-sky-500">
                                Waktu Kebarangkatan
                            </small>
                            <br />
                            <DatePicker showTimeInput={true} id={`departured_time`} selected={new Date(departured_time)} dateFormat={`dd MMMM yyyy HH:mm`} onChange={date => setDeparturedTime(date || new Date())} className=" w-full p-1 outline-none hover:border-b hover: border-b-sky-500" required={true} />
                        </div>
                        <div className=" my-2 border rounded-md p-2">
                            <small className=" text-xs font-semibold text-sky-500">
                                Tiba Di
                            </small>
                            <input type="text" id={`arrived_location`} onChange={(e) => setArrivedLocation(e.target.value)} className=" w-full p-1 outline-none hover:border-b hover: border-b-sky-500" required={true} />
                        </div>
                        <div className=" my-2 border rounded-md">
                            <small className=" text-xs font-semibold text-sky-500">
                                Waktu Kedatangan
                            </small>
                            <br />
                            <DatePicker showTimeInput id={`arrived_time`} selected={new Date(arrived_time)} dateFormat={`dd MMMM yyyy HH:mm`} onChange={date => setArrivedTime(date || new Date())} className=" w-full p-1 outline-none hover:border-b hover: border-b-sky-500" required={true} />
                        </div>
                        <div className=" my-2 border rounded-md p-2">
                            <small className=" text-xs font-semibold text-sky-500">
                                Harga
                            </small>
                            <input type="number" id={`price`} value={price.toString()} onChange={(e) => setPrice(Number(e.target.value))} className=" w-full p-1 outline-none hover:border-b hover: border-b-sky-500" required={true} />
                        </div>
                        <div className=" my-2 border rounded-md p-2">
                            <small className=" text-xs font-semibold text-sky-500">
                                Jenis Kereta
                            </small>
                            <select id={`train_id`} value={train_id.toString()} onChange={e => setTrainId(Number(e.target.value))} className=" w-full p-1 outline-none border hover: border-b-sky-500" required={true}>
                                <option value="">
                                    Pilih Jenis Kereta
                                </option>
                                {
                                    myProps.trains.map((kereta, index) => (
                                        <option
                                            value={kereta.id}
                                            key={`optionKereta-${index}`}>
                                            {kereta.name}
                                        </option>
                                    ))
                                }
                            </select>
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

export default AddSchedule