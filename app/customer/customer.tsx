"use client"

import { UserType } from "../karyawan/types"
import Link from "next/link"
import DeleteCustomer from "./deleteCustomer"
import EditCustomer from "./editCustomer"
import AddCustomer from "./addCustomer"
import ResetPassword from "./resetPassword"

type props = {
    item: UserType
}

const Customer = (myprops: props) => {
    return (
        <div className=" w-full flex my-2 border rounded-md">
            <div className="w-full p-2 md:w-4/12 flex flex-col">
                <small className=" text-sm font-medium">
                    Nama Pelanggan
                </small>
                <span>
                    <Link href={`/karyawan/customer/${myprops.item.id}`}>{myprops.item.name}</Link>
                </span>
            </div>
            <div className="w-full p-2 md:w-4/12 flex flex-col">
                <small className=" text-sm font-medium">
                    Alamat Pelanggan
                </small>
                <span>
                    <Link href={`/karyawan/customer/${myprops.item.id}`}>{myprops.item.address}</Link>
                </span>
            </div>
            <div className="w-full p-2 md:w-4/12 flex flex-col">
                <small className=" text-sm font-medium">
                    No Handphone Pelanggan
                </small>
                <span>
                    <Link href={`/karyawan/customer/${myprops.item.id}`}>{myprops.item.phone}</Link>
                </span>
            </div>
            <div className="w-full p-2 md:w-2/12 flex flex-col">
                <small className=" text-sm font-medium">
                    Option
                </small>

                <div className=" flex gap-2 items-center">


                    <DeleteCustomer customer={myprops.item} />
                    <EditCustomer customer={myprops.item} />
                    <ResetPassword customer={myprops.item} />

                </div>
            </div>
        </div>
    )
}

export default Customer