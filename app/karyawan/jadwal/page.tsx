export const dynamic = "force-dynamic";

import { getServerCookie } from "@/helper/server-cookie";
import { axiosIstance } from "@/helper/api";
import Schedule from "./schedule";
import { KeretaType, ScheduleType } from "../types";
import AddSchedule from "./addSchedule";
import EditSchedule from "./editSchedule";


// get jadwal kereta
const getJadwal = async (): Promise<ScheduleType[]> => {

    try {
        const url = `/schedule`
        const TOKEN = await getServerCookie(`token`)

        // hit endpoint
        const response: any = await axiosIstance.get(url, {
            headers: {
                Authorization: `Bearer ${TOKEN}`
            }
        })

        if (response.data.success === true) {
            return response.data.data

        }
        return []

    } catch (error) {
        console.log(error);
        return []

    }

}
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

const JadwalPage = async () => {
    const dataJadwal = await getJadwal()
    const dataKereta = await getKereta()
    return (
        <div className=" w-full p-5 bg-white ">
            <h1 className=" text-xl font-semibold">
                Data Jadwal
            </h1>
            <span className=" text-sm text-slate-500">
                Halaman ini memuat semua jadwal yang tersedia
            </span>

            <AddSchedule trains={dataKereta}/>
            

            <div className=" my-3">
                {
                    dataJadwal.map((jadwal, index) => (
                        <Schedule
                            key={`keyJadwal-${index}`}
                            item={jadwal} />
                    ))
                }
            </div>
        </div>
    )
}

export default JadwalPage