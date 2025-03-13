"use client"

import Modal from "@/components/modal"
import { axiosIstance} from "@/helper/api"
import { getCookie } from "@/helper/clientCookie"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import {UserType } from "../types"

type props = {
    admin: UserType
}

const EditCustomer = (myprops: props) => {

    const [name, setName] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [nik, setNik] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [show, setShow] = useState<boolean>(false)
    const router = useRouter()

    const openModal = () => {
        setShow(true)
        setName(myprops.admin.name)
        setAddress(myprops.admin.address)
        setNik(myprops.admin.nik)
        setPhone(myprops.admin.phone)
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const TOKEN = getCookie(`token`)
            const url = `/customer/${myprops.admin.id}`
            const requestData = {
                name,
                address,
                nik,
                phone
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
                        containerId: `toastEditCustomer-${myprops.admin.id}`,
                        type: `success`
                    }
                )
                setShow(false)
                // refresh page
                setTimeout(() => router.refresh(), 1000)
            }
            else {
                toast(
                    message,
                    {
                        containerId: `toastEditCustomer-${myprops.admin.id}`,
                        type: `warning`
                    }
                )
            }

        } catch (error) {
            console.log(error)
            toast(
                ` Some Thing Wong`,
                {
                    containerId: `toastEditCustomer-${myprops.admin.id}`,
                    type: `error`
                }
            )

        }
    }

    return (
        <div>
            <ToastContainer containerId={`toastEditCustomer-${myprops.admin.id}`} />
            <button type="button" onClick={() => openModal()} className=" px-2 py-1 rounded-md bg-sky-600 hover:bg-sky-500 text-white">
                &#x270E;
            </button>
            <Modal isShow={show}>
                <form onSubmit={e => handleSubmit(e)}>
                    {/* modal header */}
                    <div className=" w-full p-3 rounded-t-lg">
                        <h1 className=" font-semibold text-lg">
                            Edit Data Customer
                        </h1>
                        <span className=" text-sm text-slate-500">
                            Pastikan data sudah diisi yang benar
                        </span>
                    </div>

                    {/* modal body */}
                    <div className=" w-full p-3">
                        <div className=" my-2 border rounded-md p-3">
                            <small className=" text-sm font-semibold text-sky-600">
                                Nama Customer
                            </small>
                            <input type="text" id={`name-${myprops.admin.id}`} value={name} onChange={(e) => setName(e.target.value)} required={true} className=" p-1 outline-none focus:border-b-sky-600 focus:border-b w-full" />
                        </div>
                        <div className=" my-2 border rounded-md p-3">
                            <small className=" text-sm font-semibold text-sky-600">
                                Alamat
                            </small>
                            <input type="text" id={`address-${myprops.admin.id}`} value={address} onChange={(e) => setAddress(e.target.value)} required={true} className=" p-1 outline-none focus:border-b-sky-600 focus:border-b w-full" />
                        </div>
                        <div className=" my-2 border rounded-md p-3">
                            <small className=" text-sm font-semibold text-sky-600">
                                Nik
                            </small>
                            <input type="text" id={`nik-${myprops.admin.id}`} value={nik} onChange={(e) => setNik(e.target.value)} required={true} className=" p-1 outline-none focus:border-b-sky-600 focus:border-b w-full" />
                        </div>
                        <div className=" my-2 border rounded-md p-3">
                            <small className=" text-sm font-semibold text-sky-600">
                                Phone
                            </small>
                            <input type="text" id={`phone-${myprops.admin.id}`} value={phone} onChange={(e) => setPhone(e.target.value)} required={true} className=" p-1 outline-none focus:border-b-sky-600 focus:border-b w-full" />
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

export default EditCustomer