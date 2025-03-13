"use client"

import { removeCookie } from "@/helper/clientCookie"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ReactNode, useState } from "react"

type Props = {
    children: ReactNode
}

const EmployeeTemplate = (myProps: Props) => {

    const [show, setShow] = useState<boolean>(false)

    const router = useRouter()

    const handeleLogout = () => {
        // menghapus token dari cookie
        removeCookie(`token`)
        router.replace(`/`) //direct to login page
    }

    return (
    //     <div className=" w-dvw">
    //         {/* header secton */}
    //         <header className=" items-center gap-3 w-full p-3 bg-blue-500 flex ">
    //             <button type="button" className=" size-8 rounded-full flex justify-center items-center bg-orange-500 hover:bg-orange-400" onClick={() => setShow(true)}>

    //                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    //                     <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    //                 </svg>

    //             </button>
    //             <h1 className=" text-xl font-bold text-white ">
    //                 Sekopling JesGeJes
    //             </h1>
    //         </header>
    //         {/* sidebar section */}
    //         <div className={` w-1/2 md:w-1/3 lg:w-1/4 bg-orange-500 h-dvh fixed top-0 transform transition-transform ${show ? `left-0` : `right-full`}`}>

    //             <div className=" w-full relative">
    //                 {/* brand section */}
    //                 <div className=" w-full text-white font-bold my-5 flex justify-center">

    //                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-16">
    //                         <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
    //                     </svg>

    //                 </div>
    //                 <div className=" absolute right-3 -top-5 cursor-pointer text-2xl font-bold" onClick={() => setShow(false)}>
    //                     &times;
    //                 </div>
    //             </div>

    //             {/* menu section */}
    //             <div className=" w-full flex flex-col">
    //                 <Link href={"/karyawan/kereta"} className=" w-full rounded-md text-white p-3 font-semibold hover:bg-orange-400">
    //                     Data Kereta
    //                 </Link>
    //                 <Link href={"/karyawan/admin"} className=" w-full rounded-md text-white p-3 font-semibold hover:bg-orange-400">
    //                     Data Admin
    //                 </Link>
    //                 <Link href={"/karyawan/customer"} className=" w-full rounded-md text-white p-3 font-semibold hover:bg-orange-400">
    //                     Data Pelanggan
    //                 </Link>
    //                 <Link href={"/karyawan/jadwal"} className=" w-full rounded-md text-white p-3 font-semibold hover:bg-orange-400">
    //                     Data Jadwal
    //                 </Link>
    //             </div>
    //         </div>

    //         {myProps.children}
    //     </div>
    // )

<div className="drawer">
    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Sidebar</label>
        <div className=" w-full flex flex-col">
            <Link href={"/karyawan/kereta"} className=" w-full rounded-md text-white p-3 font-semibold hover:bg-orange-400">
                Data Kereta
            </Link>
            <Link href={"/karyawan/admin"} className=" w-full rounded-md text-white p-3 font-semibold hover:bg-orange-400">
                Data Admin
            </Link>
            <Link href={"/karyawan/customer"} className=" w-full rounded-md text-white p-3 font-semibold hover:bg-orange-400">
                Data Pelanggan
            </Link>
            <Link href={"/karyawan/jadwal"} className=" w-full rounded-md text-white p-3 font-semibold hover:bg-orange-400">
                Data Jadwal
            </Link>
            <div className=" w-full text-white p-3 font-semibold bg-red-600 hover:bg-red-500 cursor-pointer" onClick={handeleLogout} title="Logout">
                Keluar
            </div>
        </div>
    </div>
    <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li><a>Sidebar Item 1</a></li>
            <li><a>Sidebar Item 2</a></li>
        </ul>
    </div>
</div>
)}


export default EmployeeTemplate