"use client"

import { UserType } from "../types"
import Link from "next/link"
import DeleteCustomer from "./deleteCustomer"
import EditCustomer from "./editCustomer"
import ResetCustomerPass from "./resetPassword"

type props = {
    item: UserType
}

const Customer = (myprops: props) => {
    return (
        <div className=" w-full flex my-2 border rounded-md p-5">
            <div className="w-full p-2 md:w-4/12 flex flex-col">
                <small className=" text-md font-semibold">
                    Nama Customer
                </small>
                <span>
                    <Link href={`/customer/${myprops.item.id}`}>{myprops.item.name}</Link>
                </span>
            </div>
            <div className="w-full p-2 md:w-4/12 flex flex-col">
                <small className=" text-md font-semibold">
                    Username
                </small>
                <span>
                    <Link href={`/customer/${myprops.item.id}`}>{myprops.item.user_details.username}</Link>
                </span>
            </div>
            <div className="w-full p-2 md:w-4/12 flex flex-col">
                <small className=" text-md font-semibold">
                    Nik
                </small>
                <span>
                    <Link href={`/customer/${myprops.item.id}`}>{myprops.item.nik}</Link>
                </span>
            </div>
            <div className="w-full p-2 md:w-4/12 flex flex-col">
                <small className=" text-md font-semibold">
                    Address
                </small>
                <span>
                    <Link href={`/customer/${myprops.item.id}`}>{myprops.item.address}</Link>
                </span>
            </div>
            <div className="w-full p-2 md:w-4/12 flex flex-col">
                <small className=" text-md font-semibold">
                    Phone
                </small>
                <span>
                    <Link href={`/customer/${myprops.item.id}`}>{myprops.item.phone}</Link>
                </span>
            </div>
            <div className="w-full p-2 md:w-2/12 flex flex-col">
                <small className=" text-md font-semibold">
                    Option
                </small>

                <div className=" flex gap-2 items-center">

                    <DeleteCustomer admin={myprops.item} />
                    <EditCustomer admin={myprops.item} />
                    <ResetCustomerPass admin={myprops.item} />

                    {/* <DeleteAdmin admin={myprops.item} />
                    <EditAdmin admin={myprops.item} />
                    <ResetPassword admin={myprops.item} /> */}

                </div>
            </div>
        </div>
    )
}

export default Customer