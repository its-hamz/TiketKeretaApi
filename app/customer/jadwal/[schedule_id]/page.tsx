

// get kereta by jadwal

import { KeretaType, ScheduleType } from "@/app/karyawan/types";
import { axiosIstance } from "@/helper/api";
import { getServerCookie } from "@/helper/server-cookie";
import Booking from "./booking";

const showTime = (date: string) => {
    const currentDate = new Date(date)
    return currentDate.toLocaleTimeString(
        `id-ID`,
        {
            year: "numeric",
            month: "long",
            day: "2-digit"
        }
    )
}

const getKeretaBySchedule = async (schedule_id: number): Promise<KeretaType | null> => {
    try {
        const url = `/schedule/train/${schedule_id}`
        const TOKEN = await getServerCookie(`token`)
        const response: any = await axiosIstance.get(url, {
            headers: {
                authorization: `Bearer ${TOKEN}`
            }
        })
        if (response.data.success == true) {
            return response.data.data
        }
        return null

    } catch (error) {
        console.log(error);
        return null
    }
}

const getScheduleDetail = async (schedule_id: number): Promise<ScheduleType | null> => {
    try {
        const url = `/schedule/${schedule_id}`
        const TOKEN = await getServerCookie(`token`)
        const response: any = await axiosIstance.get(url, {
            headers: {
                authorization: `Bearer ${TOKEN}`
            }
        })
        if (response.data.success == true) {
            return response.data.data
        }
        return null

    } catch (error) {
        console.log(error);
        return null
    }
}

type Props = {
    params: {
        schedule_id: number
    }
}

const KeretaDetailPage = async (myprop: Props) => {
    const schedule_id = myprop.params.schedule_id
    const detailSchedule = await getScheduleDetail(schedule_id)
    const detailKereta = await getKeretaBySchedule(schedule_id)

    return (
        <div className=" w-full p-3">
            <h1 className=" text-2xl font-semibold">
                Detail Keberangkatan Kereta
            </h1>

            <table>
                <tbody>
                    <tr>
                        <td>Stasiun Keberangkatan</td>
                        <td>: {detailSchedule?.departured_location}</td>
                    </tr>
                    <tr>
                        <td>Waktu Keberangkatan</td>
                        <td>: {showTime(detailSchedule?.departured_time || "")}</td>
                    </tr>
                    <tr>
                        <td>Stasiun Tujuan</td>
                        <td>{detailSchedule?.arrived_location}</td>
                    </tr>
                    <tr>
                        <td>Waktu Kedatangan</td>
                        <td>: {showTime(detailSchedule?.arrived_time || "")}</td>
                    </tr>
                    <tr>
                        <td>Nama Kereta</td>
                        <td>: {detailKereta?.name}</td>
                    </tr>
                </tbody>
            </table>
            <Booking
                schedule_id={schedule_id}
                wagons={detailKereta?.wagons || []}
            />
        </div>
    )
}

export default KeretaDetailPage