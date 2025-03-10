"use client"

import Modal from "@/components/modal"
import { axiosIstance } from "@/helper/api"
import { getCookie } from "@/helper/clientCookie"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import { UserType } from "../types"

type props = {
    admin: UserType

}

const EditAdmin = (myprops: props) => {

    const [name, setName] = useState<string>("")
    const [username, setusername] = useState<string>("")
    const [address, setAddres] = useState<string>("")
    const [nik, setnik] = useState<string>("")
    const [phone, setphone] = useState<string>("")
    const [show, setShow] = useState<boolean>(false)
    const router = useRouter()

    const openModal = () => {
        setShow(true)
        setName(myprops.admin.name)
        setusername(myprops.admin.user_details.username)
        setAddres(myprops.admin.address)
        setnik(myprops.admin.nik)
        setphone(myprops.admin.phone)
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const TOKEN = getCookie(`token`)
            const url = `/employee/${myprops.admin.id}`
            const requestData = {
                name,
                username,
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
                        containerId: `toastEditAdmin-${myprops.admin.id}`,
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
                        containerId: `toastEditAdmin-${myprops.admin.id}`,
                        type: `warning`
                    }
                )
            }

        } catch (error) {
            console.log(error)
            toast(
                `Some Thing Wong`,
                {
                    containerId: `toastEditAdmin-${myprops.admin.id}`,
                    type: `error`
                }
            )

        }
    }

    return (
        <div>
            <ToastContainer containerId={`toastEditAdmin-${myprops.admin.id}`} />
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
                            Edit Data Admin
                        </h1>
                        <span className=" text-sm text-slate-500">
                            Pastikan data sudah diisi yang benar
                        </span>
                    </div>

                    {/* modal body */}
                    <div className=" w-full p-3">
                        <div className=" my-2 border rounded-md p-3">
                            <small className=" text-sm font-semibold text-sky-600">
                                Nama Admin
                            </small>
                            <input type="text" id={`name-${myprops.admin.id}`} value={name} onChange={(e) => setName(e.target.value)} required={true} className=" p-1 outline-none focus:border-b-sky-600 focus:border-b w-full" />
                        </div>
                        <div className=" my-2 border rounded-md p-3">
                            <small className=" text-sm font-semibold text-sky-600">
                                Username
                            </small>
                            <input type="text" id={`username-${myprops.admin.id}`} value={username} onChange={(e) => setusername(e.target.value)} required={true} className=" p-1 outline-none focus:border-b-sky-600 focus:border-b w-full" />
                        </div>
                        <div className=" my-2 border rounded-md p-3">
                            <small className=" text-sm font-semibold text-sky-600">
                                Alamat
                            </small>
                            <input type="text" id={`address-${myprops.admin.id}`} value={address} onChange={(e) => setAddres(e.target.value)} required={true} className=" p-1 outline-none focus:border-b-sky-600 focus:border-b w-full" />
                        </div>
                        <div className=" my-2 border rounded-md p-3">
                            <small className=" text-sm font-semibold text-sky-600">
                                NIK
                            </small>
                            <input type="text" id={`nik-${myprops.admin.id}`} value={nik} onChange={(e) => setnik(e.target.value)} required={true} className=" p-1 outline-none focus:border-b-sky-600 focus:border-b w-full" />
                        </div>
                        <div className=" my-2 border rounded-md p-3">
                            <small className=" text-sm font-semibold text-sky-600">
                                Nomor Handphone
                            </small>
                            <input type="text" id={`phone-${myprops.admin.id}`} value={phone} onChange={(e) => setphone(e.target.value)} required={true} className=" p-1 outline-none focus:border-b-sky-600 focus:border-b w-full" />
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

export default EditAdmin