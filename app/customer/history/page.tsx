export const dynamic = "force-dynamic";

import { axiosIstance } from '@/helper/api'
import React from 'react'
import History from './history'
import { HistoryType } from '@/app/karyawan/types'
import { getServerCookie } from '@/helper/server-cookie'
import FilterHistory from './filterHistory'

const GetDataHistory = async (start_date: string, end_date: string): Promise<HistoryType[]> => {
    try {
        const token = await getServerCookie('token')
        const response: any = await axiosIstance.get(`/purchase/customer?start_date=${start_date}&end_date=${end_date}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (!response.data.success) return []

        return response.data.data
    } catch (error) {
        console.log(error)
        return []
    }
}
type props = {
    searchParams: {
        start_date?: string
        end_date?: string
    }
}


const page = async (myprop: props) => {

    const start_date = await (myprop.searchParams)?.start_date?.toString() || ""
    const end_date = await (myprop.searchParams)?.end_date?.toString() || ""
    const dataHistory = await GetDataHistory(start_date, end_date)

    return (
        <div>
            <div className="bg-blue-600 w-full p-5 rounded shadow-md gap-3 mt-5">
                <h1 className="text-white text-xl font-bold">
                    History Pemesanan
                </h1>

                <FilterHistory
                    start_date={start_date}
                    end_date={end_date}
                />

            </div>

            <div className='flex flex-col p-3'>
                {

                    dataHistory.map((item, index) => (
                        <History key={index} item={item} />

                    ))
                }
            </div>
        </div>
    )
}

export default page