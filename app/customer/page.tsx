// function untuk get all data kereta

import { getServerCookie } from "@/helper/server-cookie";
import {UserType, } from "../karyawan/types";
import { axiosIstance } from "@/helper/api";
import AddCustomer from "./addCustomer";
import Customer from "./customer";

const getCustomer = async (): Promise<UserType[]> => {
    try {
        // get token from cookie
        const TOKEN = await getServerCookie(`token`)

        const url = `/customer`
        const response: any = await axiosIstance.get(url, {
            headers: {
                authorization: `Bearer ${TOKEN}`
            }
        })

        if (response.data.success == true) {
            return response.data.data
        }

        return []

    } catch (error) {
        console.log(error);
        return []

    }
}

const CustomerPage = async () => {
    // call function to load data from backend

    const dataCustomer = await getCustomer()

    return (
        <div className=" w-full p-5 bg-white">
            <h1 className=" text-xl font-semibold">
                Data Pelanggan
            </h1>
            <span className=" text-sm">
                Halaman ini memuat semua data admin yang tersedia
            </span>
            <div className=" my-3">
                <AddCustomer/>
                {/* mapping data admin */}
                {
                    dataCustomer.map((customer, index) => (
                        <Customer
                            item={customer}
                            key={`customer-${index}`}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default CustomerPage