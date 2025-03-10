"use client"

import { KursiType } from "@/app/karyawan/types"
import Modal from "@/components/modal"
import { FormEvent, useState } from "react"

type SeatBook = {
    passanger_id: string
    passanger_name: string
    seat_number: string
}
type Props = {
    item: KursiType
    onSave: (data: SeatBook) => void
}

const Seat = (myProp: Props) => {
    const [show, setShow] = useState<boolean>(false)
    const [passanger_id, setPassanger_id] = useState<string>("")
    const [passanger_name, setSPassangerName] = useState<string>("")

    const openModal = () => {
        setShow(true)
        setPassanger_id("")
        setSPassangerName("")
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setShow(false)
        myProp.onSave({ passanger_id, passanger_name, seat_number: myProp.item.seat_number })
    }

    return (
        <div>
            <button type="button" disabled={myProp.item.used} onClick={() => setShow(true)} className=" size-10 flex justify-center items-center font-semibold rounded-md bg-sky-600 disabled:bg-slate-600 text-white">
                {myProp.item.seat_number}
            </button>
            <Modal isShow={show}>
                <form onSubmit={handleSubmit}>
                    <div className=" w-full p-3 rounded-t-lg">
                        <h1 className=" font-semibold text-lg">
                            Identitas Pelanggan
                        </h1>
                        <span className=" text-sm text-slate-500">
                            Pastikan Data Sudah Benar
                        </span>
                    </div>
                    <div className=" w-full p-3">
                        <div className=" my-2">
                            <small className=" text-xs font-semibold to-sky-600">
                                Nomor Kursi
                            </small> <br />
                            <strong className=" font-semibold ">
                                {myProp.item.seat_number}
                            </strong>
                        </div>
                        <div className=" my-2">
                            <small className=" text-xs font-semibold to-sky-600">
                                NIK Penumpang
                            </small> <br />
                            <input type="number" id={`nik-${myProp.item.id}`} required={true} value={passanger_id} onChange={e => setPassanger_id(e.target.value)}
                                className=" w-full border p-2 rounded-sm text-sm" />
                        </div>
                        <div className=" my-2">
                            <small className=" text-xs font-semibold to-sky-600">
                                Nama Penumpang
                            </small> <br />
                            <input type="text" id={`nama-${myProp.item.id}`} required={true} value={passanger_name} onChange={e => setSPassangerName(e.target.value)}
                                className=" w-full border p-2 rounded-sm text-sm" />
                        </div>
                    </div>

                    {/* modal footer */}
                    <div className=" w-full p-3 rounded-b-lg flex items-center justify-end gap-2">
                        <button type="button" onClick={() => closeModal()} className=" px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 text-white">
                            Cancel
                        </button>
                        <button type="submit" className=" px-4 py-2 rounded-md bg-green-700 hover:bg-green-600 text-white">
                            Book
                        </button>

                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default Seat