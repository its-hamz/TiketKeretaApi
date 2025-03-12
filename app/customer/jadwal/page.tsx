export const dynamic = "force-dynamic";

import FilterJadwal from "./filterJadwal"
import { getServerCookie } from "@/helper/server-cookie"
import { axiosIstance } from "@/helper/api"
import Schedule from "./schedule"
import { ScheduleType } from "@/app/karyawan/types"

const getJadwal = async (departured_location: string, arrived_location: string): Promise<ScheduleType[]> => {
    try {
        // get token from cookie
        const TOKEN = await getServerCookie(`token`)
        const url = `/schedule?departured_location=${departured_location}&arrived_location=${arrived_location}`
        // hit endpoint
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
        console.log(error)
        return []
    }
}

type props = {
    searchParams: Promise<{
        departured_location?: string
        arrived_location?: string
    }>
}

const JadwalPage = async (myprop: props) => {
    const departured_location = (await myprop.searchParams)?.departured_location?.toString() || ""
    const arrived_location = (await myprop.searchParams)?.arrived_location?.toString() || ""
    const dataJadwal = await getJadwal(departured_location, arrived_location)

    return (
        <div className="w-full p-3 ">
            <div className="bg-blue-600 w-full p-3 rounded-md shadow-md">
                <h1 className="text-white text-xl font-bold">
                    Pemesanan tiket kereta api
                </h1>

                <FilterJadwal
                    departured_location={departured_location}
                    arrived_location={arrived_location} 
                />

            </div>

            {
                departured_location !== "" &&
                arrived_location !== "" &&
                <div className="my-3">
                    {/* div ini akan tampil jika departured_location dan arrived_location tidak kosong */}
                    {
                        dataJadwal.length == 0 ?
                            <div className="w-full p-3 rounded-md bg-orange-100">
                                Maaf, Jadwal gaada cuyyy
                            </div> :
                            <div>
                                {
                                    dataJadwal.map((jadwal, index) => (
                                        <Schedule
                                            item={jadwal}
                                            key={`jadwal - ${index}`} />
                                ))
                            }
                            </div>
                    }
                </div>
            }



        </div>
    )
}
export default JadwalPage