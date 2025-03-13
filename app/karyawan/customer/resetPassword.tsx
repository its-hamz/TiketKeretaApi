"use client"

import Modal from "@/components/modal"
import { axiosIstance } from "@/helper/api"
import { getCookie } from "@/helper/clientCookie"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import {UserType } from "../types"

type props = {
    admin: UserType
}

const ResetCustomerPass= (myprops: props) => {

    const [password, setPassword] = useState<string>("")
    const [show, setShow] = useState<boolean>(false)
    const router = useRouter()

    const openModal = () => {
        setShow(true)
        setPassword("")
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
                password
            }

            // hit endpoint
            const response: any = await axiosIstance.put(url, requestData, {
                headers: {
                    authorization: ` Bearer ${TOKEN}`
                }
            })

            const message = response.data.message

            if (response.data.success === true) {
                toast(
                    message,
                    {
                        containerId: `toastEdit-${myprops.admin.id}`,
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
                        containerId: `toastEdit-${myprops.admin.id}`,
                        type: `warning`
                    }
                )
            }

        } catch (error) {
            console.log(error)
            toast(
                ` Some Thing Wong`,
                {
                    containerId: `toastEdit-${myprops.admin.id}`,
                    type: `error`
                }
            )

        }
    }

    return (
        <div>
            <ToastContainer containerId={`toastEdit-${myprops.admin.id}`} />
            <button type="button" onClick={() => openModal()} className=" px-2 py-1 rounded-md bg-slate-500 hover:bg-slate-400 text-white ">
                Reset
            </button>
            <Modal isShow={show}>
                <form onSubmit={e => handleSubmit(e)}>
                    {/* modal header */}
                    <div className=" w-full p-3 rounded-t-lg">
                        <h1 className=" font-semibold text-lg">
                            Edit Password customer
                        </h1>
                        <span className=" text-sm text-slate-500">
                            Pastikan data sudah diisi yang benar
                        </span>
                    </div>

                    {/* modal body */}
                    <div className=" w-full p-3">
                        <div className=" my-2 border rounded-md p-3">
                            <small className=" text-sm font-semibold text-sky-600">
                                Password
                            </small>
                            <input type="text" id={`name-${myprops.admin.id}`} value={password} onChange={(e) => setPassword(e.target.value)} required={true} className=" p-1 outline-none focus:border-b-sky-600 focus:border-b w-full" />
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

export default ResetCustomerPass