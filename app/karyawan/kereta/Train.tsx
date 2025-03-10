"use client"

import { KeretaType } from "../types"
import EditKereta from "./editKereta"
import DeleteKereta from "./deleteKereta"
import Link from "next/link"

type props = {
    item: KeretaType
}

const Train = (myprops: props) => {
    return (
        <div className=" w-full flex flex-wrap my-2 border rounded-md">
            <div className="w-full p-2 md:w-4/12 flex flex-col">
                <small className=" text-sm font-medium">
                    Nama Kereta
                </small>
                <span>
                    <Link href={`/karyawan/kereta/${myprops.item.id}`}>{myprops.item.name}</Link>
                </span>
            </div>
            <div className="w-full p-2 md:w-4/12 flex flex-col">
                <small className=" text-sm font-medium">
                    Deskripsi Kereta
                </small>
                <span>
                    <Link href={`/karyawan/kereta/${myprops.item.id}`}>{myprops.item.descriptions}</Link>
                </span>
            </div>
            <div className="w-full p-2 md:w-2/12 flex flex-col">
                <small className=" text-sm font-medium">
                    Tipe Kereta
                </small>
                <span>
                    <Link href={`/karyawan/kereta/${myprops.item.id}`}>{myprops.item.type}</Link>
                </span>
            </div>
            <div className="w-full p-2 md:w-2/12 flex flex-col">
                <small className=" text-sm font-medium">
                    Option
                </small>

                <div className=" flex gap-2 items-center">
                    <EditKereta kereta={myprops.item}/>
                    <DeleteKereta kereta={myprops.item}/>

                </div>
            </div>
        </div>
    )
}

export default Train