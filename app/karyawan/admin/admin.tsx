"use client"

import { UserType } from "../types"
import Link from "next/link"
import DeleteAdmin from "./deleteAdmin"
import EditAdmin from "./editAdmin"
import ResetPassword from "./resetPassword"

type props = {
    item: UserType
}

const Admin = (myprops: props) => {
    return (
        <div className=" w-full flex my-2 border rounded-md">
            <div className="w-full p-2 md:w-4/12 flex flex-col">
                <small className=" text-sm font-medium">
                    Nama Admin
                </small>
                <span>
                    <Link href={`/karyawan/admin/${myprops.item.id}`}>{myprops.item.name}</Link>
                </span>
            </div>
            <div className="w-full p-2 md:w-4/12 flex flex-col">
                <small className=" text-sm font-medium">
                    Alamat Admin
                </small>
                <span>
                    <Link href={`/karyawan/admin/${myprops.item.id}`}>{myprops.item.address}</Link>
                </span>
            </div>
            <div className="w-full p-2 md:w-4/12 flex flex-col">
                <small className=" text-sm font-medium">
                    No Handphone Admin
                </small>
                <span>
                    <Link href={`/karyawan/admin/${myprops.item.id}`}>{myprops.item.phone}</Link>
                </span>
            </div>
            <div className="w-full p-2 md:w-2/12 flex flex-col">
                <small className=" text-sm font-medium">
                    Option
                </small>

                <div className=" flex gap-2 items-center">

                    <DeleteAdmin admin={myprops.item} />
                    <EditAdmin admin={myprops.item} />
                    <ResetPassword admin={myprops.item} />

                </div>
            </div>
        </div>
    )
}

export default Admin