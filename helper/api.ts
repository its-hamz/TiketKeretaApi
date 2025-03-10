// file ini digunaka untuk inisiasi dan konfugurasi axios

import axios from "axios";

export const axiosIstance = 
    axios.create({
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            'APP-KEY': process.env.NEXT_PUBLIC_APP_KEY
        }
    })




