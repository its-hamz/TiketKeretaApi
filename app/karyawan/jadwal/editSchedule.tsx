"use client"

import Modal from "@/components/modal"
import { axiosIstance } from "@/helper/api"
import { getCookie } from "@/helper/clientCookie"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import { KeretaType, ScheduleType } from "../types"
import DatePicker from "react-datepicker"

type props = {
    schedule: ScheduleType
}

const EditSchedule = (myprops: props) => {
    const [show, setShow] = useState<boolean>(false)
    const router = useRouter()

    const [departured_location, setDeparturedLocation] = useState<string>("")
    const [arrived_location, setArrivedLocation] = useState<string>("")
    const [departured_time, setDeparturedTime] = useState<Date>(new Date())
    const [arrived_time, setArrivedTime] = useState<Date>(new Date())
    const [price, setPrice] = useState<number>(0)

    const openModal = () => {
        setShow(true)
        setDeparturedLocation(myprops.schedule.departured_location)
        setArrivedLocation(myprops.schedule.arrived_location)
        setDeparturedTime(new Date(myprops.schedule.departured_time))
        setArrivedTime(new Date(myprops.schedule.arrived_time))
        setPrice(myprops.schedule.price)
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const TOKEN = getCookie(`token`)
            const url = `/schedule/${myprops.schedule.id}`
            const requestData = {
                departured_location,
                arrived_location,
                departured_time,
                arrived_time,
                price

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
                        containerId: `toastEditSchedule-${myprops.schedule.id}`,
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
                        containerId: `toastEditSchedule-${myprops.schedule.id}`,
                        type: `warning`
                    }
                )
            }

        } catch (error) {
            console.log(error)
            toast(
                `Some Thing Wong`,
                {
                    containerId: `toastEditSchedule-${myprops.schedule.id}`,
                    type: `error`
                }
            )

        }
    }

    return (
        <div>
            <ToastContainer containerId={`toastEditSchedule-${myprops.schedule.id}`} />
            <button type="button" onClick={() => openModal()} className=" px-2 py-1 rounded-md bg-sky-600 hover:bg-sky-500 text-white">
                &#x270E;
            </button>
            <Modal isShow={show}>
                <form onSubmit={e => handleSubmit(e)}>
                    {/* modal header */}
                    <div className=" w-full p-3 rounded-t-lg">
                        <h1 className=" font-semibold text-lg">
                            Edit Data Jadwal
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
                            <input type="text" value={departured_location} id={`departured_location`} onChange={(e) => setDeparturedLocation(e.target.value)} className=" w-full p-1 outline-none hover:border-b hover: border-b-sky-500" required={true} />
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
                            <input type="text" value={arrived_location} id={`arrived_location`} onChange={(e) => setArrivedLocation(e.target.value)} className=" w-full p-1 outline-none hover:border-b hover: border-b-sky-500" required={true} />
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
                    </div>

                    {/* modal footer */}
                    <div className=" w-full p-3 rounded-b-lg flex items-center justify-end gap-2">
                        <button type="button" onClick={() => closeModal()} className=" px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 text-white">
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

export default EditSchedule