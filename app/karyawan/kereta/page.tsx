// function untuk get all data kereta
export const dynamic = "force-dynamic";

import { getServerCookie } from "@/helper/server-cookie";
import { KeretaType } from "../types";
import { axiosIstance } from "@/helper/api";
import Train from "./Train";
import AddKereta from "./addkereta";

const getKereta = async (): Promise<KeretaType[]> => {
    try {
        // get token from cookie
        const TOKEN = await getServerCookie(`token`)

        const url = `/train`
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

const KeretaPage = async () => {
    // call function to load data from backend

    const dataKereta = await getKereta()

    return (
        <div className=" w-full p-5 bg-white">
            <h1 className=" text-xl font-semibold">
                Data Kereta
            </h1>
            <span className=" text-sm">
                Halaman ini memuat semua data kereta yang tersedia
            </span>
            <div className=" my-3">
                <AddKereta/>
                {/* mapping data kereta */}
                {
                    dataKereta.map((kereta, index) => (
                        <Train
                            item={kereta}
                            key={`kereta-${index}`}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default KeretaPage