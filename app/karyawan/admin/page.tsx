// function untuk get all data kereta
export const dynamic = "force-dynamic";

import { getServerCookie } from "@/helper/server-cookie";
import {UserType, } from "../types";
import { axiosIstance } from "@/helper/api";
import AddAdmin from "./addAdmin";
import Admin from "./admin";

const getAdmin = async (): Promise<UserType[]> => {
    try {
        // get token from cookie
        const TOKEN = await getServerCookie(`token`)

        const url = `/employee`
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

const AdminPage = async () => {
    // call function to load data from backend

    const dataAdmin = await getAdmin()

    return (
        <div className=" w-full p-5 bg-white">
            <h1 className=" text-xl font-semibold">
                Data Admin
            </h1>
            <span className=" text-sm">
                Halaman ini memuat semua data admin yang tersedia
            </span>
            <div className=" my-3">
                <AddAdmin/>
                {/* mapping data admin */}
                {
                    dataAdmin.map((admin, index) => (
                        <Admin
                            item={admin}
                            key={`admin-${index}`}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default AdminPage